import { useEffect, useMemo, useState } from "react";
import { signUp } from "./api";
import { Input } from "./components/Input";
import { useTranslation } from "react-i18next";

export function SignUp() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMesage] = useState();
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    setErrors(function (lastErrors) {
      return {
        ...lastErrors,
        username: undefined,
      };
    });
  }, [username]);

  useEffect(() => {
    setErrors(function (lastErrors) {
      return {
        ...lastErrors,
        email: undefined,
      };
    });
  }, [email]);

  useEffect(() => {
    setErrors(function (lastErrors) {
      return {
        ...lastErrors,
        password: undefined,
      };
    });
  }, [password]);

  const onSubmit = async (event) => {
    // bir HTML formu gönderildiğinde sayfanın yeniden yüklenmesini engellemek veya bir bağlantı tıklandığında sayfanın başka bir sayfaya gitmesini engellemek için event.preventDefault() kullanılır. Bu, JavaScript tarafından ele alınan olayın varsayılan tarayıcı davranışını iptal eder.
    event.preventDefault();
    setSuccessMesage();
    setApiProgress(true);
    setGeneralError();
    try {
      const response = await signUp({
        // key ve assign ettigimiz value'nin degisken isimleri aynı ise tekrar etmemize gerek yok yani username: username yapmamıza gerek yok sadece username yazmak yeterli olacaktır.
        username,
        email,
        password,
      });
      setSuccessMesage(response.data.message);
    } catch (error) {
      if (error.response?.data) {
        if (error.response.data.status === 400) {
          setErrors(error.response.data.validationErrors);
        } else {
          setGeneralError(error.response.data.message);
        }
      } else {
        setGeneralError(t("genericError"));
      }
    } finally {
      setApiProgress(false);
    }

    // .then((response) => {
    //   setSuccessMesage(response.data.message);
    // })
    // .finally(() => setApiProgress(false));
  };

  const passwordRepeatError = useMemo(() => {
    if (password && password !== rePassword) {
      return t("passwordMismatch");
    }
    return "";
  }, [password, rePassword]);

  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2 mt-3">
        <form className="card" onSubmit={onSubmit}>
          <div className="text-center card-header">
            <h1>{t("signUp")}</h1>
          </div>
          <div className="card-body">
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}

            {generalError && (
              <div className="alert alert-danger" role="alert">
                {generalError}
              </div>
            )}
            <Input
              id="username"
              label={t("username")}
              error={errors.username}
              onChange={(event) => setUsername(event.target.value)}
              type="text"
            />
            <Input
              id="email"
              label={t("email")}
              error={errors.email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
            />

            <Input
              id="password"
              label={t("password")}
              error={errors.password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />

            <Input
              id="repassword"
              label={t("rePassword")}
              error={passwordRepeatError}
              onChange={(event) => setRePassword(event.target.value)}
              type="password"
            />
          </div>
          <div className="text-center">
            <button
              className="btn btn-primary mb-3"
              disabled={apiProgress || !password || password !== rePassword}
            >
              {apiProgress && (
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
              )}
              {t("signUp")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
