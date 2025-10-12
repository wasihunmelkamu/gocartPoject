import LoginForm from '../../../components/LoginForm';
import '../../../actions/login.action'

export default function LoginPage() {

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <LoginForm />
      </div>
    </section>
  );
}
