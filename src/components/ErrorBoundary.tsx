import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('SANAR page rendering error', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="status-page">
          <a className="status-brand" href="/" aria-label="SANAR IT Solutions home">
            <img src="/assets/logo/logo-96.webp" width="38" height="38" alt="" />
            <span>SANAR IT Solutions</span>
          </a>
          <section className="status-card" aria-labelledby="error-title">
            <p className="status-kicker">Something went wrong</p>
            <h1 id="error-title">This page couldn’t load.</h1>
            <p className="status-copy">Please try again, or contact our team if the problem continues.</p>
            <nav className="status-actions" aria-label="Recovery links">
              <a className="btn btn--primary" href="/">Home</a>
              <a className="btn btn--ghost" href="/#contact">Contact</a>
              <button className="btn btn--ghost" type="button" onClick={() => window.location.reload()}>Try again</button>
            </nav>
          </section>
        </main>
      )
    }
    return this.props.children
  }
}
