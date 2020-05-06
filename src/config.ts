import { workspace } from 'vscode';

const config = workspace.getConfiguration('ast-query');

export default {
  get globalFileGlob() {
    return config.get('ast-query.globalFileGlob') as string;
  },
  get globalIgnoreGlob() {
    return config.get('ast-query.globalIgnoreGlob') as string;
  },
};
