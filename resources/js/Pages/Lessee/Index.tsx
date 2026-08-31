import AuthLayout from '@/Layouts/AuthLayout';
import LesseeLayout from '@/Layouts/LesseeLayout';

const Index = () => {

  return (
    <AuthLayout>
      <div className="max-w-7xl mx-auto">
          <h1 className="flex items-center text-3xl font-bold mb-6 text-brandYellow">Reservations</h1>
      </div>
    </AuthLayout>
  )
};

export default Index;