

const MenuItemCard = ({item}) => {
    const {price,image,name,recipe} = item;
    return (
        <div className="flex">
            <img style={{borderRadius: '0px 200px 200px 200px'}} className="w-[120px]" src={image} alt="" />
            <div className="ms-3">
                <p className="uppercase">{name}------------</p>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-400">{price}</p>
        </div>
    );
};

export default MenuItemCard;