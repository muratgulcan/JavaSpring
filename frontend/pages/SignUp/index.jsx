import { useEffect, useState } from "react";
import axios from "axios";
import { signUp } from "./api";

export function SignUp() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMesage] = useState();
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();

  useEffect(() => {
    setErrors({});
  }, [username]);

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
      if (error.response?.data && error.response.data.status === 400) {
        setErrors(error.response.data.validationErrors);
      } else {
        setGeneralError("Unexpected error occured. Please try again.");
      }
    } finally {
      setApiProgress(false);
    }

    // .then((response) => {
    //   setSuccessMesage(response.data.message);
    // })
    // .finally(() => setApiProgress(false));
  };

  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
        <form className="card" onSubmit={onSubmit}>
          <div className="text-center card-header">
            <h1>Sign Up</h1>
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

            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className={
                  errors.username ? "form-control is-invalid" : "form-control"
                }
                onChange={(event) => setUsername(event.target.value)}
              />
              <div className="invalid-feedback">{errors.username}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                type="text"
                id="email"
                className="form-control"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="repassword" className="form-label">
                Password Repeat
              </label>
              <input
                type="password"
                id="repassword"
                className="form-control"
                onChange={(event) => setRePassword(event.target.value)}
              />
            </div>
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
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
