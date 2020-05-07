import { workspace } from 'vscode';

const config = workspace.getConfiguration();

export default {
  get globalFileGlob() {
    return config.get('ast-query.globalFileGlob') as string;
  },
  get globalIgnoreGlob() {
    return config.get('ast-query.globalIgnoreGlob') as string;
  },
  get excludeSetting() {
    const excludedFiles = config.get('search.exclude') as { [glob: string]: boolean };
    return Object.entries(excludedFiles)
      .filter(([, exclude]) => exclude)
      .map(([glob]) => glob);
  },
  get useGitignore() {
    return config.get('ast-query.useGitignore') as boolean;
  },
};
