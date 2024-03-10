export interface OptionModel {
  id: number;
  type: string;
  className: string;
  label: string;
  value: string | boolean;
}

export interface GroupModel {
  title: string;
  classNames: string;
  options: OptionModel[];
}

export interface SectionModel {
  id: number;
  sectionTitle: string;
  groups: GroupModel[];
}

export type ReportTemplateModel = {
  id: number;
  testTitle: string;
  note?: string;
  sections: SectionModel[];
};
