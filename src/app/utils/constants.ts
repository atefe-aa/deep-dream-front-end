export const CHART_LIMIT = 12;

export const imgURL1 =
  "http://magic.deepdream.ir/#/project/44973/image/45407/slice/45408?viewer=faf05z19e";

export const imgURL2 =
  "http://magic.deepdream.ir/#/project/44973/image/45448/slice/45449?viewer=rspvwop20";

export const imgURL3 =
  "http://magic.deepdream.ir/#/project/44973/image/45487/slice/45488?viewer=gy38kob63";

export const defaultAlerts = [
  {
    id: 7,
    name: "Dr. Ahmadi",
    description: "Made an annotation.",
    time: "1 hr",
    icon: "message-text-2",
    state: "primary",
  },
  {
    id: 6,
    name: "Dr. Soltani",
    description: "Made an annotation.",
    time: "2 hrs",
    icon: "message-text",
    state: "danger",
  },
  {
    id: 5,
    name: "Dr. Nasr",
    description: "Made an annotation.",
    time: "5 hrs",
    icon: "message-text",
    state: "warning",
  },
  // {
  //   id: 4,
  //   name: "Project Red",
  //   description: "Made an annotation.",
  //   time: "2 days",
  //   icon: "cloud-change",
  //   state: "success",
  // },
  // {
  //   id: 3,
  //   name: "Project Breafing",
  //   description: "Made an annotation.",
  //   time: "21 Jan",
  //   icon: "compass",
  //   state: "primary",
  // },
  // {
  //   id: 2,
  //   name: "Banner Assets",
  //   description: "Made an annotation.",
  //   time: "21 Jan",
  //   icon: "graph-3",
  //   state: "info",
  // },
  // {
  //   id: 1,
  //   name: "Icon Assets",
  //   description: "Made an annotation.",
  //   time: "20 March",
  //   icon: "color-swatch",
  //   state: "warning",
  // },
];



export const REPORT_TEMPLATES = [
  {
    id: 1,
    testTitle: "PAP.SMEAR",
    note: "A single negative pap smear has a limited value in cervical cancer screening.",
    sections: [
      {
        id: 2,
        sectionTitle: "CERVICOVAGINAL CYTOPATHOLOGY REPORT (PAP.SMEAR)",
        groups: [
          {
            title: "SPECIMEN TYPE",
            classNames: "",
            options: [
              {
                id: 1,
                type: "checkbox",
                className: "",
                label: "Conventional",
                value: false,
              },
              {
                id: 2,
                type: "checkbox",
                className: "",
                label: "Liquid-Based",
                value: false,
              },
              {
                id: 3,
                type: "checkbox",
                className: "",
                label: "Thin prep",
                value: false,
              },
              {
                id: 4,
                type: "checkbox",
                className: "",
                label: "E.Prep",
                value: false,
              },
            ],
          },
        ],
      },
      {
        id: 3,
        sectionTitle:
          "SPECIMEN ADEQUENCY: CERVICOVAGINAL CYTOPATHOLOGY REPORT (PAP.SMEAR)",
        groups: [
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 5,
                type: "checkbox",
                className: "",
                label: "Satisfactory for evaluation",
                value: false,
              },
              {
                id: 6,
                type: "checkbox",
                className: "",
                label: "Unsatisfactory for evaluation",
                value: false,
              },
            ],
          },
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 7,
                type: "checkbox",
                className: "",
                label: "Endocervical/Transformation zone cells are present",
                value: false,
              },
              {
                id: 8,
                type: "checkbox",
                className: "",
                label: "Scant cellularity",
                value: false,
              },
              {
                id: 9,
                type: "checkbox",
                className: "",
                label: "Obscured by blood",
                value: false,
              },
            ],
          },
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 10,
                type: "checkbox",
                className: "",
                label: "Absence of Endocervical/Metaplastic cells",
                value: false,
              },
              {
                id: 11,
                type: "checkbox",
                className: "",
                label: "Poor preservation",
                value: false,
              },
              {
                id: 12,
                type: "checkbox",
                className: "",
                label: "Obscured by inflammation",
                value: false,
              },
            ],
          },
        ],
      },
      {
        id: 4,
        sectionTitle: "INTERPRETATION/RESULT",
        groups: [
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 13,
                type: "checkbox",
                className: "",
                label: "Negative for intraepithelial lesion of maligancy",
                value: false,
              },
            ],
          },
        ],
      },
      {
        id: 5,
        sectionTitle: "ORGANISM",
        groups: [
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 14,
                type: "checkbox",
                className: "",
                label: "Trichomonas vaginalls",
                value: false,
              },
              {
                id: 15,
                type: "checkbox",
                className: "",
                label: "Mixed bacteria",
                value: false,
              },
            ],
          },
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 16,
                type: "checkbox",
                className: "",
                label:
                  "Fungal organisms morphologyally consistent with candida Spp",
                value: false,
              },
            ],
          },
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 17,
                type: "checkbox",
                className: "",
                label: "Shift in flora suggestive of bacterial vaginosis",
                value: false,
              },
            ],
          },
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 18,
                type: "checkbox",
                className: "",
                label:
                  "Bacteria morphologically consistent with actinomyces Spp",
                value: false,
              },
            ],
          },
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 19,
                type: "checkbox",
                className: "",
                label: "chlamydia",
                value: false,
              },
              {
                id: 20,
                type: "checkbox",
                className: "",
                label: "Cellular changes consistent with herps simplex virus",
                value: false,
              },
            ],
          },
        ],
      },
      {
        id: 6,
        sectionTitle: "Presence of inflammation",
        groups: [
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 21,
                type: "checkbox",
                className: "",
                label: "Mild",
                value: false,
              },
              {
                id: 22,
                type: "checkbox",
                className: "",
                label: "Moderate",
                value: false,
              },
              {
                id: 23,
                type: "checkbox",
                className: "",
                label: "severe",
                value: false,
              },
            ],
          },
        ],
      },
      {
        id: 7,
        sectionTitle: "OTHER NON-NEOPLASTIC FINDINGS",
        groups: [
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 24,
                type: "checkbox",
                className: "",
                label: "Reactive cellular changes associatied with:",
                value: false,
              },
            ],
          },
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 25,
                type: "checkbox",
                className: "",
                label: "Inflammation",
                value: false,
              },
              {
                id: 26,
                type: "checkbox",
                className: "",
                label: "Inflammation (Includes typical Repair)",
                value: false,
              },
            ],
          },
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 27,
                type: "checkbox",
                className: "",
                label: "Radiation",
                value: false,
              },
              {
                id: 28,
                type: "checkbox",
                className: "",
                label: "Intrauterine Contraceptive Device (IUD)",
                value: false,
              },
            ],
          },
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 29,
                type: "checkbox",
                className: "",
                label: "Glandular cells status post hysterectomy",
                value: false,
              },
              {
                id: 30,
                type: "checkbox",
                className: "",
                label: "Atrophy",
                value: false,
              },
              {
                id: 31,
                type: "checkbox",
                className: "",
                label: "Atrophic vaginitis",
                value: false,
              },
              {
                id: 32,
                type: "checkbox",
                className: "",
                label: "Metaplasia",
                value: false,
              },
            ],
          },
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 33,
                type: "checkbox",
                className: "",
                label:
                  "Endometrial cells present in a woman 45 years old or more",
                value: false,
              },
            ],
          },
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 34,
                type: "checkbox",
                className: "",
                label: "Squamous Metaplasia",
                value: false,
              },
              {
                id: 35,
                type: "checkbox",
                className: "",
                label: "Keratotic",
                value: false,
              },
              {
                id: 36,
                type: "checkbox",
                className: "",
                label: "Pregnancy associated changes",
                value: false,
              },
              {
                id: 37,
                label: "Other",
                value: false,
              },
            ],
          },
          {
            title: "",
            classNames: "bordered fw-bold",
            options: [
              {
                id: 38,
                label: "Epithelial cell abnormalities",
                value: false,
              },
            ],
          },
        ],
      },
      {
        id: 8,
        sectionTitle: "SQUAMOUS CELLS",
        groups: [
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 39,
                label: "Atypical squamous cells",
                value: false,
              },
            ],
          },
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 40,
                label: "Of undetermined significance (ASC-US)",
                value: false,
              },
            ],
          },
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 41,
                label: "Can mot exclude HSIL (ASC-H)",
                value: false,
              },
            ],
          },
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 42,
                label: "Low-Grade squamous intraepithelial lesion (LSIL)",
                value: false,
              },
              {
                id: 43,
                label: "HPV",
                value: false,
              },
            ],
          },
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 44,
                label: "High-Grade squamous intraepithelial lesion (HSIL)",
                value: false,
              },
            ],
          },
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 44,
                label: "With features suspicious for invasion",
                value: false,
              },
            ],
          },
          {
            title: "",
            type: "checkboxes",
            classNames: "",
            options: [
              {
                id: 45,
                label: "Squamous cell carcinoma",
                value: false,
              },
            ],
          },
        ],
      },
      {
        id: 9,
        sectionTitle: "GLANDULAR CELLS",
        groups: [
          {
            title: "",
            type: "checkboxes",
            classNames: "",
            options: [
              {
                id: 46,
                label: "Atypical",
                value: false,
              },
            ],
          },
          {
            title: "",
            type: "checkboxes",
            classNames: "",
            options: [
              {
                id: 47,
                label: "Endocervical cells",
                value: false,
              },
              {
                id: 48,
                label: "Endometrial cells",
                value: false,
              },
              {
                id: 49,
                label: "Glendular cells, favor neoplasia",
                value: false,
              },
            ],
          },
          {
            title: "",
            type: "checkboxes",
            classNames: "",
            options: [
              {
                id: 50,
                label: "Glendular cells",
                value: false,
              },
              {
                id: 51,
                label: "Endocervical cells, favor neoplasia",
                value: false,
              },
            ],
          },
          {
            title: "",
            type: "checkboxes",
            classNames: "",
            options: [
              {
                id: 52,
                label: "Endocervical adenocarcinoma in situ",
                value: false,
              },
            ],
          },
          {
            title: "",
            type: "checkboxes",
            classNames: "",
            options: [
              {
                id: 53,
                label: "Adenocarcinoma",
                value: false,
              },
            ],
          },
          {
            title: "",
            type: "checkboxes",
            classNames: "",
            options: [
              {
                id: 54,
                label: "Endocervical",
                value: false,
              },
              {
                id: 55,
                label: "Extrauterine",
                value: false,
              },
              {
                id: 56,
                label: "Endometrial",
                value: false,
              },
              {
                id: 57,
                label: "Not Otherwise Specified (NOS)",
                value: false,
              },
            ],
          },
          {
            title: "",
            type: "checkboxes",
            classNames: "",
            options: [
              {
                id: 58,
                label: "Other malignant neoplasms",
                value: false,
              },
            ],
          },
        ],
      },
      {
        id: 10,
        sectionTitle: "Recommendation",
        groups: [
          {
            title: "",
            type: "checkboxes",
            classNames: "",
            options: [
              {
                id: 59,
                label: "Repeat Smear",
                value: false,
              },
              {
                id: 60,
                label: "Immediately",
                value: false,
              },
              {
                id: 61,
                label: "after treatment",
                value: false,
              },
              {
                id: 62,
                label: "In ___ Month(s)",
                value: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    testTitle: "Pathology",
    note: "",
    sections: [
      {
        id: 11,
        sectionTitle: "Macroscopic Descripption",
        groups: [
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 63,
                type: "textArea",
                className: "",
                label: "",
                value: "",
              },
            ],
          },
        ],
      },
      {
        id: 12,
        sectionTitle: "Microscopic Descripption",
        groups: [
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 64,
                type: "textArea",
                className: "",
                label: "",
                value: "",
              },
            ],
          },
        ],
      },
      {
        id: 13,
        sectionTitle: "Diagnosis",
        groups: [
          {
            title: "",
            classNames: "",
            options: [
              {
                id: 65,
                type: "textArea",
                className: "",
                label: "",
                value: "",
              },
            ],
          },
        ],
      },
    ],
  },
];
