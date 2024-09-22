import * as React from 'react';
import { Label, Pivot, PivotItem } from '@fluentui/react';
import Walks from '../pages/HomePage/Walks';

export const PivotLargeExample:React.FC = () => (
  <div>
    <Pivot aria-label="Large Link Size Pivot Example" linkSize="large">
      <PivotItem headerText="My Files">
        <Walks/>
      </PivotItem>
      <PivotItem headerText="Recent">
        <Label>Pivot #2</Label>
      </PivotItem>
      <PivotItem headerText="Shared with me">
        <Label>Pivot #3</Label>
      </PivotItem>
    </Pivot>
  </div>
);
