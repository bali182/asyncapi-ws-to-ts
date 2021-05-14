import { isNil } from './utils'

export enum DiagnosticSeverity {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
}

export type PathItem = number | string

export type DiagnosticIssue = {
  severity: DiagnosticSeverity
  path: ReadonlyArray<PathItem>
  message: string
}

export class DiagnosticError extends Error {
  readonly diagnostics: Diagnostics

  constructor(diagnostics: Diagnostics) {
    super('Diagnostic error')
    this.name = this.constructor.name
    this.diagnostics = diagnostics
  }
}

export class Diagnostics {
  private readonly _parent: Diagnostics
  private readonly _issues: DiagnosticIssue[]
  private readonly _path: PathItem[]

  constructor(parent: Diagnostics, path: PathItem[]) {
    this._parent = parent
    this._path = path
    this._issues = []
  }

  get ok(): boolean {
    return false
  }

  append(issue: DiagnosticIssue): void {
    this._issues.push(issue)
    const root = this.root()
    if (!isNil(root)) {
      root.append(issue)
    }
  }

  child(...path: PathItem[]): Diagnostics {
    if (path.length === 0) {
      return this
    }
    return new Diagnostics(this, this.path().concat(path))
  }

  issues(): ReadonlyArray<DiagnosticIssue> {
    return this._issues
  }

  path(): ReadonlyArray<PathItem> {
    return this._path
  }

  error(message: string): void {
    this.append({
      message,
      severity: DiagnosticSeverity.ERROR,
      path: Array.from(this._path),
    })
  }

  warning(message: string): void {
    this.append({
      message,
      severity: DiagnosticSeverity.WARNING,
      path: Array.from(this._path),
    })
  }

  info(message: string): void {
    this.append({
      message,
      severity: DiagnosticSeverity.INFO,
      path: Array.from(this._path),
    })
  }

  parent(): Diagnostics {
    return this._parent
  }

  root(): Diagnostics {
    return isNil(this.parent()) ? this : this.parent().root()
  }
}
