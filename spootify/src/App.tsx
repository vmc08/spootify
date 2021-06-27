import Routes from "routes";
import CoreLayout from "common/layouts/CoreLayout";
import Login from "common/components/Login";
import useTokens from "store/tokens/useTokens";

const App = () => {
  const { tokensState } = useTokens();
  console.log(tokensState);
  return tokensState?.access_token ? (
    <CoreLayout>
      <Routes />
    </CoreLayout>
  ) : (
    <Login />
  );
};

export default App;
