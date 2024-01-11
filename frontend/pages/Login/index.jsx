import { useEffect, useMemo, useState } from "react";

import { useTranslation } from "react-i18next";
import { Alert } from "../../src/shared/components/Alert";
import { Input } from "../../src/shared/components/Input";
import { Button } from "../../src/shared/components/Button";
import { signIn } from "./api";

export function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMesage] = useState();
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const { t } = useTranslation();

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
      const response = await signIn({
        // key ve assign ettigimiz value'nin degisken isimleri aynı ise tekrar etmemize gerek yok yani username: username yapmamıza gerek yok sadece username yazmak yeterli olacaktır.
        email,
        password,
      });
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
  };

  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2 mt-3">
        <form className="card" onSubmit={onSubmit}>
          <div className="text-center card-header">
            <h1>{t("signIn")}</h1>
          </div>
          <div className="card-body">
            {successMessage && <Alert>{successMessage}</Alert>}

            {generalError && <Alert styleType="danger">{generalError}</Alert>}

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
          </div>
          <div className="text-center">
            <Button disabled={!email || !password} apiProgress={apiProgress}>
              {t("signIn")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
