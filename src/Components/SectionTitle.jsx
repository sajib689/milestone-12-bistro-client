

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mt-12 mb-12">
            <p className="text-yellow-600 text-center">{subHeading}</p>
            <p className="text-3xl uppercase text-center">{heading}</p>
        </div>
    );
};

export default SectionTitle;