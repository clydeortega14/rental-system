import LesseeLayout from '@/Layouts/LesseeLayout';

const Index = ({ headerData, bookings }) => {
  return <div />; // content not needed; content is in LesseeLayout tab
};

Index.layout = (page) => (
  <LesseeLayout defaultTab="bookings">
    {page}
  </LesseeLayout>
);

export default Index;