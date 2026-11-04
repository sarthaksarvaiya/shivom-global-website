import React from 'react';
import { TeaOriginGradeExplorer, TeaOriginGradeExplorerProps } from './TeaOriginGradeExplorer';

export type GradeSpecificationTableProps = TeaOriginGradeExplorerProps;

/**
 * GradeSpecificationTable
 * Modernized to 'The Tea Origin & Grade Explorer' while preserving complete backwards compatibility
 * with existing parent page anchors, props, and form routing.
 */
export const GradeSpecificationTable: React.FC<GradeSpecificationTableProps> = (props) => {
  return <TeaOriginGradeExplorer {...props} />;
};

export default GradeSpecificationTable;
