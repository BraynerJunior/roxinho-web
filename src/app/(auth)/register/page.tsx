import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-[url(/images/backgroundhome.svg)] bg-cover bg-center bg-no-repeat">
      <div className="bg-white p-4 rounded-lg">
        <RegisterForm />
      </div>
    </div>
  );
}
