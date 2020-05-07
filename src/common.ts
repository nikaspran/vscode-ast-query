import { Uri, Range, GlobPattern } from 'vscode';
import { Node } from 'estree';

export function rangeFor(match: Node) {
  const location = match.loc;
  if (!location) {
    throw new Error(`Invalid match location: ${match.type}`);
  }

  return new Range(
    location.start.line - 1,
    location.start.column,
    location.end.line,
    location.end.column,
  );
}

export function joinGlobs(globs: GlobPattern[]) {
  return `{${globs.join(',')}}`;
}

export interface SearchResultsByFilePath {
  [key: string]: SearchResult;
}

export interface SearchResult {
  file: Uri;
  fileContents: string;
  matches: Node[];
}

export enum SearchScope {
  global,
  activeFile,
}
