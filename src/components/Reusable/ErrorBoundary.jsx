import { Component } from "react";
import * as Sentry from "@sentry/react";
import Error from "./Error";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error);
    console.log("Logging", { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return <Error />;
    }
    return this.props.children;
  }
}
