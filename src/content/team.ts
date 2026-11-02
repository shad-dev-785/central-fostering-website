import type { StaticImageData } from "next/image";
import faiz from "@/assets/team/faiz.jpg";
import hamait from "@/assets/team/hamait.jpg";
import shazad from "@/assets/team/shazad.jpg";

/**
 * The people shown on the home page and the Meet the team page.
 * `summary` is the short line on the home page cards; `bio` is the full profile, one string per paragraph.
 * Photos are 4:5 portraits in src/assets/team (EXIF metadata stripped).
 */
export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  summary: string;
  bio: string[];
  photo: StaticImageData;
};

export const team: TeamMember[] = [
  {
    slug: "faiz",
    name: "Faiz",
    role: "Registered Manager & Director",
    summary: "A qualified social worker with over 18 years in children's social care, including more than nine in management roles.",
    bio: [
      "Faiz is an experienced fostering professional and qualified social worker with over 18 years of experience in children's social care, including more than nine years in management roles within both Independent Fostering Agencies and Local Authorities.",
      "Holding an MA in Social Work and advanced leadership qualifications, Faiz has extensive expertise in foster carer recruitment, assessment, supervision, safeguarding, quality assurance, and service development. He has successfully managed fostering teams, chaired foster carer reviews, supported fostering panels, and worked closely with partner agencies to achieve positive outcomes for children and young people.",
      "Passionate about delivering high-quality, child-centred care, Faiz is committed to supporting foster carers, promoting placement stability, and ensuring that children receive safe, nurturing, and aspirational fostering experiences. His leadership combines strong professional judgement, regulatory knowledge, and a dedication to continuous improvement.",
    ],
    photo: faiz,
  },
  {
    slug: "hamait",
    name: "Hamait",
    role: "Business Development Consultant",
    summary: "A senior leader in fostering and regulated care who advises the agency on growth, governance and compliance.",
    bio: [
      "Hamait is an experienced business leader with a strong background in fostering services, regulated care, safeguarding, compliance, and organisational growth. Having held senior leadership positions, including Responsible Individual, Company Director, Registered Manager, and Nominated Individual, he brings extensive knowledge of strategic planning, regulatory compliance, quality assurance, and service development.",
      "Throughout his career, Hamait has successfully led and developed organisations within the care sector, ensuring high standards of care, effective governance, financial sustainability, and continuous improvement. His experience includes working closely with senior leadership teams, regulatory bodies, and partner agencies to strengthen services and achieve positive outcomes for children and young people.",
      "In his role as Business Development Consultant to Central Fostering Agency, Hamait provides strategic advice and professional guidance to support the agency's growth, governance, and continuous improvement. Drawing on his extensive leadership experience, he works alongside the Senior Management Team to help strengthen service development, regulatory compliance, and long-term organisational success.",
    ],
    photo: hamait,
  },
  {
    slug: "shazad",
    name: "Shazad",
    role: "Qualified Social Worker",
    summary: "A social worker registered with Social Work England, with over 30 years of post-qualifying experience in children's social care and fostering.",
    bio: [
      "Shazad is a qualified social worker with over 30 years of post-qualifying experience in children's social care and fostering services. Registered with Social Work England, he brings extensive leadership and management expertise gained through senior roles within fostering agency and local authorities.",
      "Throughout his career, Shazad has provided strategic and operational leadership, supporting foster carers, social workers, and children to achieve positive outcomes. His strong understanding of fostering regulations, safeguarding, and quality assurance ensures that services remain child-centred, compliant, and focused on delivering the very best care.",
      "Passionate about improving the lives of children and young people, Shazad is committed to developing Central Fostering Agency as a high-quality fostering agency, supporting foster families, and promoting stable, nurturing placements where children can thrive.",
    ],
    photo: shazad,
  },
];
