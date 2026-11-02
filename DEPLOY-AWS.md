# Putting the website on AWS (one small server)

Everything except the domain name lives on AWS. The domain and the staff mailboxes stay at GoDaddy.

```
Visitor -> GoDaddy DNS (points the domain at your server)
        -> One AWS server in London (EC2, or Lightsail if you want it simpler)
              Caddy      (free HTTPS certificate, sends www to the main address)
              Website    (Next.js) + database file (kept on a volume that survives restarts)
Form emails -> Amazon SES (sends the notification to foster@centralfostering.org.uk)
```

Why a single server and not a "serverless" setup: the site stores form submissions in a SQLite-style database
file. AWS has no hosted version of that, but a normal server keeps the file safely on its disk, so no code changes are needed.

Console button names change now and then. If a label differs slightly, look for the nearest match.

---

## Before you start

- [ ] The code is pushed to the private GitHub repo (`shad-dev-785/central-fostering-website`).
- [ ] You know the exact domain, for example `centralfostering.org.uk`. Use the one the agency owns.
- [ ] The AWS account's **root login has two-step verification** (Account menu > Security credentials > MFA). Use the root login only to create an admin user (IAM Identity Center or an IAM user with MFA), then sign in as that admin user for everyday work.
- [ ] Set a budget alert: AWS Billing > Budgets > Create budget > a monthly cost budget with an email alert. It stops surprises.

Keep every password, key and SMTP login to yourself. Type them directly into the server's `.env.production` file. Never paste them into chat, email or GitHub.

---

## Step 1. Create the server

Pick ONE option. They end in the same place (an Ubuntu server with a fixed IP), and every later step is identical.

- **Option A: EC2 (recommended if you want to learn AWS).** More pieces to set up, and each one is a real AWS building block you will use again: servers, firewalls, disks, fixed IPs, backups.
- **Option B: Lightsail (simplest).** Everything pre-packaged in one screen. Skip to the Lightsail section below.

### Option A: EC2

Open the **EC2** service in the console and switch the region (top right) to **Europe (London) eu-west-2**, so UK family data stays in the UK.

1. **Launch instance.**
   - Name: `cfa-web`.
   - Image (AMI): **Ubuntu Server 24.04 LTS**, architecture **64-bit (x86)**. Stay with x86, not Arm: this is the type the setup was tested on.
   - Instance type: one with **at least 2 GB of memory** (for example `t3.small`). Building on 1 GB can run out of memory. Check the current price in the picker.
   - Key pair: **Create new key pair**, name `cfa-key`, type ED25519, format `.pem`. It downloads once. **Keep it private and backed up**: it is the only way in.
   - Network settings: create a security group (the firewall) allowing **SSH (22)**, **HTTP (80)** and **HTTPS (443)**. For SSH, choose "My IP". If your home IP changes you can lock yourself out; you can edit the rule later in the console.
   - Storage: **30 GiB gp3**.
2. **Give it a fixed address.** EC2 > **Elastic IPs** > **Allocate Elastic IP address**, then **Associate** it with `cfa-web`. Note the number: you need it for GoDaddy. AWS charges for public IPv4 addresses, including an Elastic IP that is not attached to anything, so release it if you ever delete the server.
3. **Set up daily backups.** EC2 > **Lifecycle Manager** > **Create lifecycle policy** > EBS snapshot policy, targeting volumes tagged `Name=cfa-web` (tag the disk first under EC2 > Volumes), once a day, keep 7. Snapshots of the disk are your backup, database included.
4. **Be careful with "Terminate".** Stopping an instance is safe. **Terminating deletes it and its disk.**

When it is running, connect from your own computer (Windows PowerShell). The key file must be locked down first or SSH refuses it:

```powershell
cd $HOME\Downloads
icacls cfa-key.pem /inheritance:r /grant:r "$($env:USERNAME):R"
ssh -i cfa-key.pem ubuntu@YOUR-ELASTIC-IP
```

Type `yes` to the fingerprint question. You are now on the server; continue at Step 2.

### Option B: Lightsail

1. Open **Lightsail** (search "Lightsail" in the AWS console).
2. Pick the region **London (eu-west-2)**: UK family data stays in the UK.
3. **Create instance** > Linux/Unix > **OS only** > **Ubuntu 24.04 LTS**.
4. Choose a plan with **at least 2 GB of memory**. Building the site on 1 GB can run out of memory. Check the current price on the plan list.
5. Name it `cfa-web` and create it.
6. Open the instance > **Networking** tab:
   - **Attach static IP** (create one, name it `cfa-ip`). A static IP stays the same after restarts. Note the number: you need it for GoDaddy.
   - Under **IPv4 Firewall**, make sure these rules exist: SSH (22), HTTP (80) and **HTTPS (443)**. Add 443 if it is missing.
7. Open the **Snapshots** tab and **turn on automatic snapshots**. This is your daily backup of the whole server, database included.

## Step 2. Point the domain at the server (GoDaddy)

In GoDaddy: **Domain > DNS > Manage DNS**.

1. **Delete** the existing `A` record for `@` if it says "Parked" or points to a GoDaddy address.
2. **Add** an `A` record: Name `@`, Value = your static IP.
3. **Add** an `A` record: Name `www`, Value = your static IP.
4. **Do not touch** the `MX`, `TXT` and `CNAME` records that run your GoDaddy email.
5. Do **not** change the nameservers.

A records work for both `domain` and `www`, which avoids the problem GoDaddy has with pointing a bare domain at a name.

## Step 3. Prepare the server

You should be connected to the server already (EC2: the `ssh` command in Step 1; Lightsail: **Connect using SSH**, which opens a terminal in your browser). Then run:

```bash
sudo apt update && sudo apt -y upgrade
```

Add a swap file (extra breathing room while the site builds):

```bash
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

Install Docker (Docker's official install script):

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```

Close the browser terminal and open a new one (so the Docker permission applies), then check it works:

```bash
docker run --rm hello-world
```

## Step 4. Get the code onto the server

The repo is private, so give the server a read-only "deploy key":

```bash
ssh-keygen -t ed25519 -f ~/.ssh/cfa_deploy -N ""
cat ~/.ssh/cfa_deploy.pub
```

1. Copy the line that starts with `ssh-ed25519`.
2. On GitHub: repo > **Settings > Deploy keys > Add deploy key**. Paste it, leave **Allow write access unticked**, save.
3. Back on the server:

```bash
printf 'Host github.com\n  IdentityFile ~/.ssh/cfa_deploy\n  IdentitiesOnly yes\n' >> ~/.ssh/config
git clone git@github.com:shad-dev-785/central-fostering-website.git
cd central-fostering-website
git checkout master   # or the branch you merged to
```

Say `yes` if it asks about GitHub's fingerprint.

## Step 5. Set up email sending (Amazon SES)

Do this in the AWS console, region **London (eu-west-2)**.

1. **Amazon SES > Identities > Create identity > Domain**. Enter your domain and tick **Easy DKIM**.
2. SES shows 3 `CNAME` records. Add all three in GoDaddy DNS. In GoDaddy, type only the part before your domain in the Name box (GoDaddy adds the rest).
3. **SPF:** your GoDaddy mail already has an SPF `TXT` record that starts `v=spf1`. **Edit that record** to add `include:amazonses.com` before the `~all`. Never add a second SPF record: two break email.
4. Wait until SES shows the identity as **Verified** (minutes to a few hours).
5. **SES > SMTP settings > Create SMTP credentials**. Download the username and password once and keep them private.
6. New SES accounts start in a "sandbox" (limited to 200 emails a day, to verified addresses only). That is enough for notifications, as long as the receiving address is verified. If SES says the recipient isn't verified, also verify `foster@centralfostering.org.uk` as an email identity (click the link SES sends to that mailbox). Later, request **production access** from the SES dashboard if you want it lifted.

## Step 6. Add your settings (the secrets file)

On the server, inside `central-fostering-website`:

```bash
cp .env.example .env.production
chmod 600 .env.production
nano .env.production
```

Fill in (save with Ctrl+O, Enter, Ctrl+X):

| Setting | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.org.uk` (https, no slash at the end, no www) |
| `SITE_DOMAIN` | `yourdomain.org.uk` (no https, no www) |
| `SMTP_HOST` | `email-smtp.eu-west-2.amazonaws.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` / `SMTP_PASS` | the SES SMTP credentials from Step 5 |
| `MAIL_FROM` | `Central Fostering Agency UK <no-reply@yourdomain.org.uk>` |
| `NOTIFY_EMAIL_TO` | `foster@centralfostering.org.uk` |

Leave `DATABASE_URL` alone. The compose file already points it at the persistent database file.

## Step 7. Start the site

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build
```

The first run takes a few minutes (it builds the site). When it finishes:

```bash
docker compose -f docker-compose.prod.yml ps        # both "web" and "caddy" should be running
docker compose -f docker-compose.prod.yml logs -f caddy   # watch the HTTPS certificate being issued (Ctrl+C to leave)
```

Caddy asks Let's Encrypt for a certificate as soon as your domain points at the server. If DNS is still spreading, it keeps retrying. Then open `https://yourdomain.org.uk`.

## Step 8. Check it before you tell anyone

- [ ] `https://yourdomain.org.uk` loads with a padlock; `http://` and `www.` both redirect to it.
- [ ] Submit a test callback request on the site. An email should arrive at foster@ (check spam too).
- [ ] Run the pre-launch checklist on the server: `docker compose -f docker-compose.prod.yml exec web npm run prelaunch`
- [ ] Add the site to Google Search Console and submit `https://yourdomain.org.uk/sitemap.xml`.

---

## Everyday jobs

**Update the site after a code change** (on the server):

```bash
cd ~/central-fostering-website && git pull
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build
```

**Download the enquiries as a spreadsheet** (contains personal data: keep it private and delete it after use):

```bash
docker compose -f docker-compose.prod.yml exec -T web npm run -s export:submissions > ~/submissions.csv
```

**See what the site is doing:** `docker compose -f docker-compose.prod.yml logs -f web`

**Restart everything:** `docker compose -f docker-compose.prod.yml restart`

## Things to remember

- **Backups:** the daily disk snapshots from Step 1 (EC2 Lifecycle Manager, or Lightsail automatic snapshots) are your safety net. Check from time to time that they exist, and try restoring one once so you know it works.
- **Server updates:** every month or two, connect and run `sudo apt update && sudo apt -y upgrade`, then `sudo reboot` if it asks. The containers restart on their own.
- **Free plan:** AWS free plans for new accounts are time-limited. Check the Billing console for when your credits end, and upgrade the account before then so it isn't closed.
- **Privacy policy:** mention Amazon Web Services (hosting and email sending) as processors.
