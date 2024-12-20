export interface Configuration {
  size: ConfigurationSize;
  style: ConfigurationStyle;
}

export interface ConfigurationSize {
  arrowLineWidth: number;
  nodeBorderRadius: number;
  nodePadding: number;
}

export interface ConfigurationStyle {
  arrowLineColor: string;
  gridColor: string;
  gridLineWidth: number;
  nodeBg: string;
  nodeColor: string;
  nodeDescriptionFont: string;
  nodeTitleFont: string;
}
