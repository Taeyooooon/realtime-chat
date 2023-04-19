import { useNavigate } from 'react-router-dom';

const Notfound =() => {
  const navigate = useNavigate();
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
      <p className=' text-2xl font-bold mb-4'>Not Found</p>
      <p className=' cursor-pointer' onClick={() => navigate(-1)}>
        전 페이지로 이동
      </p>
    </div>
  );
}

export default Notfound;