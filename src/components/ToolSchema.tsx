import { FC, useMemo, useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import RatingControl from './RatingControl';
import ratingControlTester from '../ratingControlTester';
import schema from '../schema.json';

const classes = {
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  resetButton: {
    margin: 'auto !important',
    display: 'block !important',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
};

const initialData = {
  class: 'GalaxyUserTool',
  id: 'cat_user_defined',
  version: '0.1',
  name: 'cat_user_defined',
  description: 'concatenates a file',
  container: 'busybox',
  shell_command: "cat '$(inputs.input1.path)' > output.txt",
  inputs: [
    {
      name: 'input1',
      type: 'data',
      format: 'txt',
    },
  ],
  outputs: [
    {
      name: 'output1',
      type: 'data',
      format: 'txt',
      from_work_dir: 'output.txt',
    },
  ],
  tests: [
    {
      inputs: {
        input1: 'simple_line.txt',
      },
      outputs: {
        output1: 'simple_line.txt',
      },
    },
  ],
};

const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: ratingControlTester, renderer: RatingControl },
];

export const ToolSourceComponent: FC = () => {
  const [data, setData] = useState<object>(initialData);
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const clearData = () => {
    setData({});
  };
  return (
    <Grid
      container
      justifyContent={'center'}
      spacing={1}
      style={classes.container}>
      <Grid item sm={6}>
        <Typography variant={'h4'}>Bound data</Typography>
        <div style={classes.dataContent}>
          <pre id="boundData">{stringifiedData}</pre>
        </div>
        <Button
          style={classes.resetButton}
          onClick={clearData}
          color="primary"
          variant="contained"
          data-testid="clear-data">
          Clear data
        </Button>
      </Grid>
      <Grid item sm={6}>
        <Typography variant={'h4'}>Rendered form</Typography>
        <div style={classes.demoform}>
          <JsonForms
            schema={schema}
            data={data}
            renderers={renderers}
            cells={materialCells}
            onChange={({ data }) => setData(data)}
          />
        </div>
      </Grid>
    </Grid>
  );
};
