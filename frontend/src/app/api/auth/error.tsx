import { useRouter } from "next/router";
import Link from "next/link";

const ErrorPage = () => {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Authentication Error</h1>
      <p>Something went wrong: {error}</p>
      <Link href="/auth/signin">
        <a>Go back to Sign In</a>
      </Link>
    </div>
  );
};

export default ErrorPage;
