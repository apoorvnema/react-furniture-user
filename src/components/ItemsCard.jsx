import { Fab, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TransitionsModal from './UI/Modal';
import ProductForm from './UI/Form/ProductForm';
import ApiManager from '../services/ApiManager';
import CustomCard from './UI/Card';
import Loader from './UI/Loader';
import { useNavigate } from 'react-router-dom';

const ItemsCard = ({ filter, search }) => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const [showModal, setShowModal] = useState(false);
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();
    const actions = [
        { label: 'Show Details', onClick: (id) => handleProductDetails(id) },
        { label: 'Add to Cart', onClick: (id) => handleAddToCart(id) },
    ];

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        let filteredByCategory = items.filter(([id, item]) => 
            item?.category.toLowerCase().includes(filter?.toLowerCase())
        );
        
        if (search) {
            filteredByCategory = filteredByCategory.filter(([id, item]) => 
                item?.name.toLowerCase().includes(search?.toLowerCase())
            );
        }
        
        setFilteredItems(filteredByCategory);
    }, [filter, search, items]);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await ApiManager.getProducts();
            const productsArray = Object.entries(response);
            setItems(productsArray);
            setFilteredItems(productsArray);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowCart = () => {
        setShowModal(true);
    }

    const handleProductDetails = (id) => {
        const itemToUpdate = items.find(([itemId]) => itemId === id)[1];
        navigation(`/product/${id}`, { state: { item: itemToUpdate } });
    }

    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '2rem',
                justifyContent: 'flex-start',
                paddingLeft: 10,
                paddingRight: 10
            }}>
                {filteredItems?.map(([id, item]) => (
                    <div key={id} style={{
                        flex: '1 1 30%',
                        minWidth: '250px',
                        maxWidth: '300px',
                        marginBottom: '1.5rem'
                    }}>
                        <CustomCard
                            title={item.name}
                            description={item.description}
                            imageUrl={item.imageUrl}
                            actions={actions}
                            quantity={item.quantity}
                            category={item.category}
                            id={id}
                        />
                    </div>
                ))}
            </div>
            <Loader loading={loading} />
            <Fab
                variant={!isSmallScreen ? 'extended' : 'circular'}
                color="primary"
                aria-label="add"
                style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}
                onClick={handleShowCart}
            >
                <AddShoppingCartIcon />
                {!isSmallScreen && <Typography sx={{ ml: 1, color: '#FFFFFF' }}>Show Cart</Typography>}
            </Fab>
            <TransitionsModal show={showModal} onClose={handleCloseModal} title={"Add Item"} >
                <ProductForm mode={"Add"} onSubmit={()=>{}} />
            </TransitionsModal>
        </>
    );
};

export default ItemsCard;
