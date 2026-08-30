import AuthLayout from '@/Layouts/AuthLayout';
import LesseeLayout from '@/Layouts/LesseeLayout';

const Index = () => {

  // return <div />; // content not needed; content is in LesseeLayout tab

  return (
    <AuthLayout>
      <div>
        
      </div>
    </AuthLayout>
  )
};

// Index.layout = (page:React.ReactNode) => (
//   <LesseeLayout defaultTab="bookings">
//     {page}
//   </LesseeLayout>
// );

export default Index;