import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@blackridge-federal.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      name: "Platform Admin",
      passwordHash,
    },
  });

  await prisma.globalSetting.deleteMany();
  await prisma.globalSetting.create({
    data: {
      companyName: "Blackridge Federal Solutions",
      tagline: "Mission-Ready Technical and Program Delivery",
      email: "contact@blackridgefederal.com",
      phone: "+1 (202) 555-0120",
      address: "1200 Defense Corridor, Arlington, VA 22202",
      linkedInUrl: "https://www.linkedin.com",
      footerStatement: "Built for agencies that demand precision, speed, and accountability.",
      heroHeadline: "Engineered For National Mission Outcomes",
      heroSubheadline:
        "We deliver professional services, engineering capability, and mission logistics for federal programs operating at global scale.",
    },
  });

  await prisma.job.deleteMany();
  await prisma.job.createMany({
    data: [
      {
        title: "Senior Program Manager",
        slug: "senior-program-manager",
        department: "Program Delivery",
        location: "Arlington, VA",
        jobType: "Hybrid",
        employmentType: "Full-Time",
        description: "Lead multi-site federal programs and oversee delivery execution across stakeholders.",
        responsibilities: ["Manage program roadmaps", "Coordinate subcontractors", "Drive executive reporting"],
        requirements: ["8+ years federal PM experience", "PMP preferred", "Ability to hold clearance"],
        benefits: ["401(k) matching", "Medical/Dental/Vision", "Annual training stipend"],
        applyUrl: "https://example.com/jobs/senior-program-manager",
        isPublished: true,
      },
      {
        title: "Cloud Security Engineer",
        slug: "cloud-security-engineer",
        department: "Engineering",
        location: "Remote - US",
        jobType: "Remote",
        employmentType: "Full-Time",
        description: "Build zero-trust cloud systems and support ATO pathways for federal workloads.",
        responsibilities: ["Design secure architectures", "Implement IaC controls", "Support RMF artifacts"],
        requirements: ["5+ years cloud security", "AWS/Azure certifications", "Public trust eligible"],
        benefits: ["Flexible work model", "Certification reimbursement", "Performance bonuses"],
        applyUrl: "https://example.com/jobs/cloud-security-engineer",
        isPublished: true,
      },
      {
        title: "Logistics Analyst",
        slug: "logistics-analyst",
        department: "Mission Support",
        location: "San Diego, CA",
        jobType: "On-Site",
        employmentType: "Full-Time",
        description: "Support readiness metrics and supply operations for mission-critical deployment cycles.",
        responsibilities: ["Track inventory KPIs", "Coordinate vendors", "Document sustainment plans"],
        requirements: ["3+ years logistics analysis", "DoD operations familiarity", "Strong Excel and SQL"],
        benefits: ["Paid parental leave", "Medical coverage", "Professional development"],
        applyUrl: "https://example.com/jobs/logistics-analyst",
        isPublished: true,
      },
    ],
  });

  await prisma.caseStudy.deleteMany();
  await prisma.caseStudy.createMany({
    data: [
      {
        title: "Modernizing Cross-Agency Data Pipelines",
        slug: "cross-agency-data-modernization",
        summary: "Unified reporting across multiple mission systems with secure data exchange and measurable uptime gains.",
        iconUrl: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
        highlights: ["99.97% platform availability", "Reduced reporting cycle by 61%", "FedRAMP-compatible controls"],
        challenge: "The agency operated disconnected reporting systems that delayed operational decisions.",
        solution: "Implemented a governed integration fabric with automated validation, lineage, and role-based access.",
        results: "Decision makers received near real-time dashboards with reduced reconciliation effort.",
        metrics: ["61% faster reporting", "$4.3M annualized cost avoidance", "12 programs integrated"],
        isFeatured: true,
        isPublished: true,
        displayOrder: 1,
      },
      {
        title: "Enterprise Service Desk Stabilization",
        slug: "service-desk-stabilization",
        summary: "Rebuilt ITSM workflows and SLAs to restore confidence for a high-volume federal support environment.",
        iconUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        imageUrl: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc",
        highlights: ["42% faster ticket resolution", "Increased first-call resolution", "Improved mission user satisfaction"],
        challenge: "Ticket backlogs and outdated runbooks created operational risk.",
        solution: "Established tiered triage, AI-assisted routing, and standardized knowledge workflows.",
        results: "Agency teams regained predictable service operations with better responsiveness.",
        metrics: ["42% faster MTTR", "27% higher FCR", "99.5% SLA adherence"],
        isFeatured: true,
        isPublished: true,
        displayOrder: 2,
      },
      {
        title: "Rapid Logistics Readiness Program",
        slug: "rapid-logistics-readiness",
        summary: "Improved mission readiness through smarter inventory controls and partner coordination.",
        iconUrl: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef",
        imageUrl: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8",
        highlights: ["Reduced stockout events", "Faster mobilization cycles", "Audit-ready records"],
        challenge: "Fragmented logistics visibility caused delays in critical missions.",
        solution: "Introduced centralized readiness dashboards and predictive replenishment workflows.",
        results: "Program improved readiness confidence and decreased emergency procurement events.",
        metrics: ["33% fewer stockouts", "22% faster deployment prep", "100% audit traceability"],
        isFeatured: true,
        isPublished: true,
        displayOrder: 3,
      },
    ],
  });

  await prisma.contract.deleteMany();
  await prisma.contract.createMany({
    data: [
      {
        name: "Enterprise IT Operations Support",
        contractNumber: "BRF-ITOPS-001",
        agency: "Department of Homeland Security",
        period: "2024-2029",
        contractType: "IDIQ",
        availability: "Open to task orders",
        programManager: "Jordan Miles",
        email: "contracts@blackridgefederal.com",
        phone: "+1 (202) 555-0142",
        summary: "Managed services for secure enterprise operations and end-user support.",
        scope: "Infrastructure operations, ITSM, cybersecurity operations, reporting and governance.",
        isPublished: true,
        displayOrder: 1,
      },
      {
        name: "Mission Engineering Integration",
        contractNumber: "BRF-ENG-014",
        agency: "Department of Defense",
        period: "2023-2028",
        contractType: "BPA",
        availability: "Prime",
        programManager: "Avery Chen",
        email: "engagements@blackridgefederal.com",
        phone: "+1 (202) 555-0178",
        summary: "Engineering modernization services for secure mission platforms.",
        scope: "Systems engineering, software modernization, integration testing, and accreditation support.",
        isPublished: true,
        displayOrder: 2,
      },
      {
        name: "Global Logistics Sustainment",
        contractNumber: "BRF-LOG-032",
        agency: "U.S. Army",
        period: "2025-2030",
        contractType: "GWAC",
        availability: "Sub and prime opportunities",
        programManager: "Riley Vaughn",
        email: "logistics@blackridgefederal.com",
        phone: "+1 (202) 555-0133",
        summary: "Lifecycle logistics planning and operational sustainment support.",
        scope: "Supply chain management, readiness analysis, warehousing optimization, and field support.",
        isPublished: true,
        displayOrder: 3,
      },
    ],
  });

  await prisma.leadershipMember.deleteMany();
  await prisma.leadershipMember.createMany({
    data: [
      {
        name: "Morgan Hale",
        title: "Chief Executive Officer",
        photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
        shortBio: "Leads enterprise mission strategy and client outcomes.",
        fullBio:
          "Morgan has led federal mission programs for over two decades, scaling delivery teams and strategic partnerships across civilian and defense sectors. Morgan focuses on disciplined execution, transparent governance, and long-term mission impact.",
        linkedInUrl: "https://www.linkedin.com",
        displayOrder: 1,
        isPublished: true,
      },
      {
        name: "Taylor Brooks",
        title: "Chief Operating Officer",
        photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        shortBio: "Owns program operations and quality delivery standards.",
        fullBio:
          "Taylor oversees enterprise operations, ensuring contract performance aligns with mission priorities and compliance obligations. Taylor has driven operational turnarounds for complex federal portfolios.",
        linkedInUrl: "https://www.linkedin.com",
        displayOrder: 2,
        isPublished: true,
      },
      {
        name: "Jordan Quinn",
        title: "Chief Technology Officer",
        photoUrl: "https://images.unsplash.com/photo-1541534401786-2077eed87a72",
        shortBio: "Directs cloud, cyber, and data engineering innovation.",
        fullBio:
          "Jordan leads engineering and innovation programs spanning cloud migration, secure software delivery, and data modernization. Jordan brings deep experience architecting mission-grade systems for regulated environments.",
        linkedInUrl: "https://www.linkedin.com",
        displayOrder: 3,
        isPublished: true,
      },
      {
        name: "Avery Reed",
        title: "Vice President, Mission Support",
        photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        shortBio: "Leads logistics and field support readiness programs.",
        fullBio:
          "Avery has delivered mission support and logistics capabilities across global deployments, with emphasis on readiness analytics and operational continuity for critical programs.",
        linkedInUrl: "https://www.linkedin.com",
        displayOrder: 4,
        isPublished: true,
      },
    ],
  });

  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: [
      {
        quote: "Blackridge improved delivery velocity while strengthening governance and transparency across our contracts.",
        authorName: "Program Executive",
        authorTitle: "Federal Civilian Agency",
        organization: "U.S. Government",
        isPublished: true,
        displayOrder: 1,
      },
      {
        quote: "Their engineering and operations team integrated quickly and performed under pressure from day one.",
        authorName: "Acquisition Lead",
        authorTitle: "DoD Program Office",
        organization: "Department of Defense",
        isPublished: true,
        displayOrder: 2,
      },
      {
        quote: "A mission-first partner with exceptional accountability and communication discipline.",
        authorName: "Division Director",
        authorTitle: "National Security Client",
        organization: "Federal Partner",
        isPublished: true,
        displayOrder: 3,
      },
    ],
  });

  await prisma.serviceItem.deleteMany();
  await prisma.serviceItem.createMany({
    data: [
      {
        category: "Professional Services",
        title: "Program and Acquisition Support",
        description: "Strategic and execution support for federal programs and procurement workflows.",
        bulletItems: ["PMO operations", "Acquisition planning", "Performance analytics", "Compliance support"],
        displayOrder: 1,
        isPublished: true,
      },
      {
        category: "Engineering & Technology Services",
        title: "Secure Modernization",
        description: "Engineering services for resilient, mission-grade digital systems.",
        bulletItems: ["Cloud architecture", "DevSecOps", "Cyber engineering", "Data platform modernization"],
        displayOrder: 2,
        isPublished: true,
      },
      {
        category: "Mission Support & Logistics",
        title: "Operational Readiness",
        description: "End-to-end logistics and sustainment support for global operations.",
        bulletItems: ["Readiness planning", "Supply chain support", "Field operations", "Asset lifecycle management"],
        displayOrder: 3,
        isPublished: true,
      },
    ],
  });

  await prisma.missionPartner.deleteMany();
  await prisma.missionPartner.createMany({
    data: [
      { name: "Federal Partner Alpha", logoUrl: "https://dummyimage.com/200x80/111/ffffff&text=Alpha", websiteUrl: "https://example.com", displayOrder: 1, isPublished: true },
      { name: "Federal Partner Bravo", logoUrl: "https://dummyimage.com/200x80/111/ffffff&text=Bravo", websiteUrl: "https://example.com", displayOrder: 2, isPublished: true },
      { name: "Federal Partner Charlie", logoUrl: "https://dummyimage.com/200x80/111/ffffff&text=Charlie", websiteUrl: "https://example.com", displayOrder: 3, isPublished: true },
      { name: "Federal Partner Delta", logoUrl: "https://dummyimage.com/200x80/111/ffffff&text=Delta", websiteUrl: "https://example.com", displayOrder: 4, isPublished: true },
      { name: "Federal Partner Echo", logoUrl: "https://dummyimage.com/200x80/111/ffffff&text=Echo", websiteUrl: "https://example.com", displayOrder: 5, isPublished: true },
      { name: "Federal Partner Foxtrot", logoUrl: "https://dummyimage.com/200x80/111/ffffff&text=Foxtrot", websiteUrl: "https://example.com", displayOrder: 6, isPublished: true }
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
