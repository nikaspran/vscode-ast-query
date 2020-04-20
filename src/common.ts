import { Uri, Range } from "vscode";
import { Node } from 'estree';

export function rangeFor(match: Node) {
  return new Range(
    match.loc?.start.line! - 1,
    match.loc?.start.column!,
    match.loc?.end.line!,
    match.loc?.end.column!,
  );
}

export interface SearchResultsByFilePath {
  [key: string]: SearchResult;
}

export interface SearchResult {
  file: Uri;
  fileContents: string;
  matches: Node[];
}
