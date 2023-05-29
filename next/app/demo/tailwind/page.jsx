import Link from 'next/link';

const DemoTailwindPage = () => {
  return (
    <article className='p-3 m-auto 2xl:w-8/12 h-screen flex flex-col'>
      <header className='p-5 rounded-xl text-3xl text-center text-white font-bold shadow-gray-600 shadow-lg bg-gray-800 border-[0.1rem] border-gray-400'>
        <h1>Tailwind example!!!</h1>
      </header>
      <main className='flex-1 p-3'>
        <section className='border-b py-5 border-gray-300'>
          <p>Tailwind 의 기본적인 사용 예제 코드입니다.</p>
          <Link href='/' className='underline text-xl'>
            home
          </Link>
        </section>
        <section>
          <h2 className='my-3 font-bold text-xl'>Form</h2>
          <div className='flex flex-wrap gap-3'>
            <label className='w-1/2 flex-1 min-w-[20rem]'>
              <div className='mb-1 font-bold text-gray-500'>Text</div>
              <input type='text' className='w-full rounded-xl' />
            </label>
            <label className='w-1/2 flex-1 min-w-[20rem]'>
              <div className='mb-1 font-bold text-gray-500'>Search</div>
              <input type='search' className='w-full rounded-xl' />
            </label>
            <label className='w-1/2 flex-1 min-w-[20rem]'>
              <div className='mb-1 font-bold text-gray-500'>Number</div>
              <input type='number' className='w-full rounded-xl' />
            </label>
            <label className='w-1/2 flex-1 min-w-[20rem]'>
              <div className='mb-1 font-bold text-gray-500'>Date</div>
              <input type='date' className='w-full rounded-xl' />
            </label>
            <label className='w-1/2 flex-1 min-w-[20rem]'>
              <div className='mb-1 font-bold text-gray-500'>Time</div>
              <input type='time' className='w-full rounded-xl' />
            </label>
            <label className='w-1/2 flex-1 min-w-[20rem]'>
              <div className='mb-1 font-bold text-gray-500'>Select</div>
              <select className='w-full rounded-xl'>
                <option>옵션 1</option>
                <option>옵션 2</option>
                <option>옵션 3</option>
                <option>옵션 4</option>
                <option>옵션 5</option>
              </select>
            </label>
            <label className='w-1/2 flex-1 min-w-[20rem]'>
              <div className='mb-1 font-bold text-gray-500'>Select with size</div>
              <div className='rounded-xl overflow-hidden border border-[#6b7280]'>
                <select className='w-full block border-none' size={3}>
                  <option>옵션 1</option>
                  <option>옵션 2</option>
                  <option>옵션 3</option>
                  <option>옵션 4</option>
                  <option>옵션 5</option>
                </select>
              </div>
            </label>
            <label className='w-1/2 flex-1 min-w-[20rem]'>
              <div className='mb-1 font-bold text-gray-500'>Select with multiple</div>
              <div className='rounded-xl overflow-hidden border border-[#6b7280]'>
                <select className='w-full block border-none' size={3} multiple>
                  <option>옵션 1</option>
                  <option>옵션 2</option>
                  <option>옵션 3</option>
                  <option>옵션 4</option>
                  <option>옵션 5</option>
                </select>
              </div>
            </label>
            <label className='w-1/2 flex-1 min-w-[20rem]'>
              <div className='mb-1 font-bold text-gray-500'>Textarea</div>
              <textarea className='w-full rounded-xl' />
            </label>
            <fieldset className='w-1/2 flex-1 min-w-[20rem]'>
              <legend className='mb-1 font-bold text-gray-500'>Checkbox</legend>
              <label className='flex items-center justify-between'>
                <span className='font-bold text-gray-500'>옵션 1</span>
                <input type='checkbox' className='rounded' />
              </label>
              <label className='flex items-center justify-between'>
                <span className='font-bold text-gray-500'>옵션 2</span>
                <input type='checkbox' className='rounded' />
              </label>
              <label className='flex items-center justify-between'>
                <span className='font-bold text-gray-500'>옵션 3</span>
                <input type='checkbox' className='rounded' />
              </label>
            </fieldset>
            <fieldset className='w-1/2 flex-1 min-w-[20rem]'>
              <legend className='mb-1 font-bold text-gray-500'>Radio</legend>
              <label className='flex items-center justify-between'>
                <span className='font-bold text-gray-500'>옵션 1</span>
                <input type='radio' name='radio' value={1} />
              </label>
              <label className='flex items-center justify-between'>
                <span className='font-bold text-gray-500'>옵션 2</span>
                <input type='radio' name='radio' value={2} />
              </label>
              <label className='flex items-center justify-between'>
                <span className='font-bold text-gray-500'>옵션 3</span>
                <input type='radio' name='radio' value={3} />
              </label>
            </fieldset>

            <div className='w-1/2 flex-1 min-w-[20rem]' />
            <div className='w-1/2 flex-1 min-w-[20rem]' />
            <div className='w-1/2 flex-1 min-w-[20rem]' />
          </div>
        </section>
      </main>
    </article>
  );
};

export default DemoTailwindPage;
