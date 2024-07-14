
const SectionTitle = ({subheading, heading}) => {
    return (
        <div className='w-80 text-center mx-auto my-10'>
            <p className='border-b-4 italic text-amber-500 text-xl pb-2'>---{subheading}---</p>
            <h2 className='border-b-4 text-3xl uppercase py-5 text-black font-semibold'>{heading}</h2>
        </div>
    );
};

export default SectionTitle;