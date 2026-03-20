import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8 text-center font-sans">
                    <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-2xl max-w-2xl">
                        <h1 className="text-3xl font-bold text-red-400 mb-4">Something went wrong.</h1>
                        <p className="text-slate-300 mb-6">The application encountered an unexpected error.</p>

                        <div className="bg-black/50 p-4 rounded-lg text-left overflow-auto max-h-60 mb-6 border border-slate-700">
                            <code className="text-red-300 font-mono text-sm break-all">
                                {this.state.error && this.state.error.toString()}
                            </code>
                        </div>

                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold transition-all"
                        >
                            Reload Application
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
