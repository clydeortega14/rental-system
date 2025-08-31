import TextInput from '../TextInput';
import InputLabel from '../InputLabel';


interface TimeSlotsProps {
  pickUpTime: string;
  setPickUpTime: (data: string) => void;
  returnTime: string;
  setReturnTime: (data: string) => void;
}

const TimeSlots = ({
  pickUpTime,
  setPickUpTime,
  returnTime,
  setReturnTime
}:TimeSlotsProps) => {
  return (
    <>
    <div className="mb-6">
      <InputLabel htmlFor="pick-up-time" value="Select time of pickup"/>
      <TextInput 
        type="time" 
        className="w-full mt-1 block" 
        id="pick-up-time"
        value={pickUpTime}
        onChange={ (e) => setPickUpTime(e.target.value)} 
      />
    </div>
    <div className="mb-6">
      <InputLabel htmlFor="return-time" value="Select time of return"/>
      <TextInput 
        type="time" 
        className="w-full mt-1 block" 
        id="return-time"
        value={returnTime}
        onChange={ (e) => setReturnTime(e.target.value)}
      />
    </div>
    </>
  )
}

export default TimeSlots