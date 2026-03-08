import type { ComponentType } from "react";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

type WithLoadingProps = {
  loading: boolean;
};

function withLoading<T extends object>(WrappedComponent: ComponentType<T>) {
  return function ComponentWithLoading(props: T & WithLoadingProps) {
    const { loading, ...rest } = props;

    if (loading) {
      return <LoadingSpinner />;
    }

    return <WrappedComponent {...(rest as T)} />;
  };
}

export default withLoading;