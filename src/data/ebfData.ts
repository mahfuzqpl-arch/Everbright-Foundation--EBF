export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  chapter: 'Bangladesh' | 'Germany';
  image: string;
}

export interface ProgramActivity {
  index: string;
  title: string;
  category: 'Education & Youth' | 'Health & Rehabilitation' | 'Rights & Advocacy' | 'Livelihoods & Agro';
  region: 'Bangladesh' | 'Germany' | 'Bangladesh & Germany';
  summary: string;
  image: string;
  caption: string;
}

export interface ArchiveDocument {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  reference: string;
  image: string;
  description: string;
}

export interface NetworkPartner {
  name: string;
  fullName: string;
  focus: string;
}

export const CORE_PILLARS = [
  { index: '01', label: 'Trust', detail: 'Transparent governance accountable to donors and communities since 2003.' },
  { index: '02', label: 'Equality', detail: 'Equal opportunity for underprivileged children, women, and rural populations.' },
  { index: '03', label: 'Justice', detail: 'Human rights advocacy, legal aid, and victim support across borders.' },
  { index: '04', label: 'Freedom', detail: 'Dignity through literacy, vocational independence, and civic awareness.' },
  { index: '05', label: 'Peace', detail: 'Cross-cultural solidarity uniting grassroots initiatives in Bangladesh and Germany.' },
];

export const CORE_VALUES = [
  {
    title: 'Transparency and Accountability',
    description: 'Every program and contribution operates under dual statutory oversight in Bangladesh (CHS-299) and Germany (VR 30923 B).',
  },
  {
    title: 'Ensure Equal Opportunity',
    description: 'Dedicated outreach to destitute children, rural and tribal families, women, and persons with disabilities.',
  },
  {
    title: 'Ensure Best Supports',
    description: 'Delivering sustained, practical assistance through education centers, mobile health camps, vocational hubs, and legal guidance.',
  },
];

export const EXECUTIVE_COMMITTEE: CommitteeMember[] = [
  // Bangladesh Executive Committee
  {
    id: 'bd-mamun',
    name: 'Mamun Abdullah',
    role: 'Chairman',
    chapter: 'Bangladesh',
    image: '/assets/ebf/ec_mamun.jpg',
  },
  {
    id: 'bd-mahfuzur',
    name: 'Mahfuzur Rahman',
    role: 'General Secretary & CEO',
    chapter: 'Bangladesh',
    image: '/assets/ebf/ec_mahfuzur.jpg',
  },
  {
    id: 'bd-kazi',
    name: 'Kazi Samiuddin Ahmed',
    role: 'Joint Secretary',
    chapter: 'Bangladesh',
    image: '/assets/ebf/ec_kazi.jpg',
  },
  {
    id: 'bd-tapan',
    name: 'Tapan Mozumder',
    role: 'Treasurer',
    chapter: 'Bangladesh',
    image: '/assets/ebf/ec_tapan.jpg',
  },
  {
    id: 'bd-khaleda',
    name: 'Khaleda Rokshana',
    role: 'Director',
    chapter: 'Bangladesh',
    image: '/assets/ebf/ec_khaleda.jpg',
  },
  {
    id: 'bd-nazmul',
    name: 'Nazmul Haider Chowdhury',
    role: 'Director',
    chapter: 'Bangladesh',
    image: '/assets/ebf/ec_nazmul.jpg',
  },
  // Germany Executive Committee
  {
    id: 'de-tushar',
    name: 'Tushar Ahmed',
    role: 'President',
    chapter: 'Germany',
    image: '/assets/ebf/ec_tushar.jpg',
  },
  {
    id: 'de-bitu',
    name: 'Bitu Barua',
    role: 'Director',
    chapter: 'Germany',
    image: '/assets/ebf/ec_bitu.jpg',
  },
  {
    id: 'de-hosne',
    name: 'Hosne Murad',
    role: 'General Secretary',
    chapter: 'Germany',
    image: '/assets/ebf/ec_hosne.jpg',
  },
  {
    id: 'de-minu',
    name: 'Minu Mozumder',
    role: 'Director',
    chapter: 'Germany',
    image: '/assets/ebf/ec_minu.jpg',
  },
  {
    id: 'de-rokshana',
    name: 'Rokshana Ahmed',
    role: 'Director',
    chapter: 'Germany',
    image: '/assets/ebf/ec_rokshana.jpg',
  },
  {
    id: 'de-asmaul',
    name: 'Asmaul Hosna',
    role: 'Director',
    chapter: 'Germany',
    image: '/assets/ebf/ec_asmaul.jpg',
  },
  {
    id: 'de-mahfuzur',
    name: 'Mahfuzur Rahman',
    role: 'Founder & CEO',
    chapter: 'Germany',
    image: '/assets/ebf/ec_mahfuzur.jpg',
  },
];

export const PROGRAM_ACTIVITIES: ProgramActivity[] = [
  {
    index: '01',
    title: 'Education for Unschooled Children',
    category: 'Education & Youth',
    region: 'Bangladesh',
    summary: 'Community learning centers and primary literacy initiatives bringing out-of-school children into structured classrooms.',
    image: '/assets/ebf/act_education.jpg',
    caption: 'Outdoor community learning session for unschooled children in Chattogram district.',
  },
  {
    index: '02',
    title: 'Women Empowerment Activities',
    category: 'Livelihoods & Agro',
    region: 'Bangladesh',
    summary: 'Grassroots leadership workshops, micro-enterprise support, and skill-building groups for rural women.',
    image: '/assets/ebf/act_women_sewing.jpg',
    caption: 'Women participating in tailoring and economic self-reliance workshops.',
  },
  {
    index: '03',
    title: 'Human Right and Legal Support',
    category: 'Rights & Advocacy',
    region: 'Bangladesh & Germany',
    summary: 'Advocacy, civic election observation, and cross-border victim support networks promoting legal awareness.',
    image: '/assets/ebf/act_europe_justice.jpg',
    caption: 'EBF delegation advocating alongside Victim Support Europe initiatives.',
  },
  {
    index: '04',
    title: 'Health Support Activities',
    category: 'Health & Rehabilitation',
    region: 'Bangladesh',
    summary: 'Permanent and mobile free medical camps delivering primary consultations and essential treatment.',
    image: '/assets/ebf/act_health_camp.jpg',
    caption: 'EBF Free Health Centre serving local families in Chattogram.',
  },
  {
    index: '05',
    title: 'Children Rights & Support Activities',
    category: 'Rights & Advocacy',
    region: 'Bangladesh',
    summary: 'Protective outreach, school supplies, and community awareness marches safeguarding child welfare.',
    image: '/assets/ebf/act_rally.jpg',
    caption: 'Children and volunteers leading a community rights awareness rally.',
  },
  {
    index: '06',
    title: 'Youth Development Activities',
    category: 'Education & Youth',
    region: 'Bangladesh & Germany',
    summary: 'International youth engagement, leadership conferences, and civic volunteer mobilization.',
    image: '/assets/ebf/act_unep_youth.jpg',
    caption: 'EBF representation at the UNEP TUNZA International Children and Youth Conference.',
  },
  {
    index: '07',
    title: 'Cultural Development Activities',
    category: 'Education & Youth',
    region: 'Bangladesh & Germany',
    summary: 'Preserving heritage performing arts, music, and intercultural exchange programs across communities.',
    image: '/assets/ebf/act_cultural.jpg',
    caption: 'Traditional cultural performance organized under EBF cultural development.',
  },
  {
    index: '08',
    title: 'Water and Environmental Sanitation',
    category: 'Health & Rehabilitation',
    region: 'Bangladesh',
    summary: 'Clean water access, hygiene education, and environmental stewardship in rural settlements.',
    image: '/assets/ebf/act_classroom.jpg',
    caption: 'School-based hygiene, environment, and sanitation awareness session.',
  },
  {
    index: '09',
    title: 'Handicrafts and Cottage',
    category: 'Livelihoods & Agro',
    region: 'Bangladesh',
    summary: 'Artisan production centers including Sona Handicrafts and Naksa preserving traditional craft livelihoods.',
    image: '/assets/ebf/act_handicrafts.jpg',
    caption: 'Naksa Handicrafts initiative supporting rural artisan employment.',
  },
  {
    index: '10',
    title: 'Migration & Remittance Awareness Initiative',
    category: 'Rights & Advocacy',
    region: 'Bangladesh & Germany',
    summary: 'Seminars and documentary outreach on safe migration pathways and productive diaspora remittance.',
    image: '/assets/ebf/act_migration.jpg',
    caption: 'Roundtable seminar on "Beyond Remittances: Potentialities and Impacts".',
  },
  {
    index: '11',
    title: 'Vocational Training',
    category: 'Livelihoods & Agro',
    region: 'Bangladesh',
    summary: 'Hands-on sewing, craftwork, and technical trade instruction creating pathways to stable income.',
    image: '/assets/ebf/act_women_sewing.jpg',
    caption: 'Sewing and vocational trade center equipping trainees for independent work.',
  },
  {
    index: '12',
    title: 'Prevention of STD and HIV/AIDS',
    category: 'Health & Rehabilitation',
    region: 'Bangladesh',
    summary: 'Public health education, youth preventive counseling, and community medical outreach.',
    image: '/assets/ebf/act_child_health.jpg',
    caption: 'Community health screening and preventive medical guidance.',
  },
  {
    index: '13',
    title: 'Autism & Disability Rehabilitation',
    category: 'Health & Rehabilitation',
    region: 'Bangladesh',
    summary: 'Specialized care, physiotherapy, cerebral palsy assistive device distribution, and SOCEP Autism Center.',
    image: '/assets/ebf/act_autism_rehab.jpg',
    caption: 'Individualized developmental and physiotherapy support for children with autism.',
  },
  {
    index: '14',
    title: 'Agro Development Activities',
    category: 'Livelihoods & Agro',
    region: 'Bangladesh',
    summary: 'Sustainable rural aquaculture, cooperative farming, and agricultural resilience initiatives.',
    image: '/assets/ebf/act_agro.jpg',
    caption: 'Field inspection of community aquaculture and agro-development site.',
  },
];

export const LINK_ORGANIZATIONS = [
  {
    name: 'SONA HANDICRAFTS',
    location: 'Satkania, Chattogram',
    focus: 'Artisan craft production, sewing centers, and rural women employment.',
  },
  {
    name: 'EBF MCS LTD.',
    location: 'Sitakunda, Chattogram',
    focus: 'Community socio-economic development and cooperative enterprise support.',
  },
  {
    name: 'SOCEP AUTISM CENTER',
    location: 'Chittagong, Bangladesh',
    focus: 'Dedicated rehabilitation, therapy, and educational support for children with autism and cerebral palsy.',
  },
];

export const ARCHIVE_DOCUMENTS: ArchiveDocument[] = [
  {
    id: 'bd-reg',
    title: 'Certificate of Registration of Societies (Act XXI of 1860)',
    subtitle: 'Government of the People’s Republic of Bangladesh',
    date: '27 February 2005',
    reference: 'Reg. No. CH-S-299 of 2005',
    image: '/assets/ebf/doc_bd_registration.jpg',
    description: 'Official society registration issued in Chattogram certifying Everbright Foundation under the Societies Registration Act XXI of 1860.',
  },
  {
    id: 'de-reg',
    title: 'Vereinsregister Certification — Amtsgericht Charlottenburg',
    subtitle: 'Federal Republic of Germany · Berlin',
    date: '14 October 2011',
    reference: 'VR 30923 B',
    image: '/assets/ebf/doc_de_registration.jpg',
    description: 'Official German registry confirmation for Everbright Foundation (EBF) Germany e.V., Postfach 6 A, 10251 Berlin.',
  },
  {
    id: 'press-pv',
    title: 'The Daily People’s View — Programme Inspection Coverage',
    subtitle: 'Chittagong Press Archive',
    date: '02 November 2007',
    reference: 'Press Clipping · Vol. 2007',
    image: '/assets/ebf/press_peoples_view.jpg',
    description: 'Coverage of Bangladesh Support Group (Holland) President Bikash Chowdhury Barua visiting EBF vocational training and youth centers in Satkania.',
  },
  {
    id: 'press-azadi',
    title: 'Daily Azadi — Satkania EBF Exchange & Remittance Workshops',
    subtitle: 'Regional Press Archive',
    date: 'November 2007',
    reference: 'Press Clipping · Azadi',
    image: '/assets/ebf/press_azadi.jpg',
    description: 'Regional coverage of EBF community exchange meetings in Satkania and diaspora remittance awareness workshops in Frankfurt, Germany.',
  },
];

export const DEVELOPMENT_NETWORKS: NetworkPartner[] = [
  {
    name: 'BASUG',
    fullName: 'BASUG — Diaspora and Development',
    focus: 'Diaspora engagement, migration awareness, and grassroots development.',
  },
  {
    name: 'ICD',
    fullName: 'Institute for Cultural Diplomacy',
    focus: 'Intercultural dialogue and international civil society cooperation.',
  },
  {
    name: 'Lions International',
    fullName: 'Lions Clubs International',
    focus: 'Community health camps, vision support, and humanitarian service.',
  },
  {
    name: 'Rotary International',
    fullName: 'Rotary International',
    focus: 'Rotary District collaborations including assistive devices for cerebral palsy.',
  },
  {
    name: 'Victim Support Europe',
    fullName: 'Victim Support Europe',
    focus: 'Rights advocacy and support for victims across European jurisdictions.',
  },
  {
    name: 'GAATW',
    fullName: 'Global Alliance Against Traffic in Women',
    focus: 'Safe migration, anti-trafficking advocacy, and women’s human rights.',
  },
  {
    name: 'UN ECOSOC',
    fullName: 'United Nations Economic and Social Council',
    focus: 'Alignment with international sustainable social development frameworks.',
  },
];

export const MEMBERSHIP_TIERS = [
  {
    id: 'donor',
    label: 'Donor Members',
    feeBdt: 'TK. 50,000',
    feeEur: '€500',
    summary: 'Principal philanthropic patronage supporting flagship education, health, and hospital establishment initiatives.',
  },
  {
    id: 'associate',
    label: 'Associate Members',
    feeBdt: 'TK. 30,000',
    feeEur: '€300',
    summary: 'Active organizational partnership contributing directly to regional welfare and vocational training programs.',
  },
  {
    id: 'lifetime',
    label: 'Lifetime Members',
    feeBdt: 'TK. 20,000',
    feeEur: '€200',
    summary: 'Enduring commitment to Everbright Foundation’s long-term mission across Bangladesh and Germany.',
  },
] as const;

export const RECREATIONAL_SPORTS = [
  'Cricket',
  'Fitness Classes (e.g. Yoga, Pilates, etc.)',
  'Football',
  'Gym',
  'Golf',
  'Karate',
  'Rugby',
  'Squash',
  'Swimming',
  'Taekwondo',
  'Tennis',
];

export const ADULT_ACTIVITIES = [
  'Book Charity',
  'Painting',
  'Cooking Classes',
  'Craft Section',
  'Live Music Section',
  'Workshops/Seminars',
  'Networking Nights',
];

export const CHILDREN_ACTIVITIES = [
  'Arts & Crafts',
  'Cooking Classes',
  'Organised Tours',
  'Workshops',
  'Summer Camps',
];

export const OFFICES = {
  contactPerson: 'Mahfuzur Rahman, General Secretary & CEO',
  website: 'https://www.everbright-foundation.de',
  websiteLabel: 'www.everbright-foundation.de',
  facebook: 'https://www.facebook.com/ever.bright.75098',
  facebookLabel: 'www.facebook.com/ever.bright.75098',
  brochurePdf: '/assets/aistudio/Everbright_Foundation_-EBF_9c136ec7.pdf',
  bangladesh: {
    title: 'Bangladesh Core Office',
    address: 'College Road, Sitakunda-4310, Chattogram, Bangladesh',
    hotline: '+8801711475526',
    tel: '+8800302856063',
    emails: ['info@everbrightbd.org', 'mahfuz.ebf@gmail.com'],
  },
  germany: {
    title: 'German Office (e.V.)',
    address: 'Rathausstr. 9, 10178 Berlin, Germany',
    phones: ['+49 1521 6790489', '+49 1763 5704059'],
    rawPhones: ['004915216790489', '004917635704059'],
    emails: ['mahfuz.ebf@gmail.com'],
  },
};
