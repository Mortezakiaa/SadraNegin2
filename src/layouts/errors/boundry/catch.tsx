import React from "react";

type ErrorHandler = (error: Error, info: React.ErrorInfo) => void;
type ErrorHandlingComponent<Props> = (props: Props, errorHandler: () => void, error?: Error) => React.ReactNode;

type ErrorState = { error?: Error };

export default function Catch<Props extends {}>(
    component: ErrorHandlingComponent<Props>,
    errorHandler?: ErrorHandler
): React.ComponentType<Props> {
    return class extends React.Component<Props, ErrorState> {
        state: ErrorState = {
            error: undefined
        }

        setErrorHandler = () => {
            console.error(this.state.error);
            this.setState(null);
        }

        static getDerivedStateFromError(error: Error) {
            return { error }
        }

        componentDidCatch(error: Error, info: React.ErrorInfo) {
            if (errorHandler) {
                errorHandler(error, info)
            }
        }

        render() {
            return component(this.props, this.setErrorHandler, this.state.error)
        }
    }
}