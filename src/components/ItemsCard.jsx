import { Fab, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import TransitionsModal from './UI/Modal';
import ProductForm from './UI/Form/ProductForm';
import ApiManager from '../services/ApiManager';
import CustomCard from './UI/Card';
import Loader from './UI/Loader';

const ItemsCard = ({ pathname }) => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const actions = [
        { label: 'Update Product', onClick: (id) => handleUpdateItem(id) },
        { label: 'Delete Product', onClick: (id) => handleDeleteItem(id) },
    ];

    useEffect(() => {
        fetchItems();
    }, []);

    const handleUpdateProduct = async (product) => {
        try {
            const body = {
                category: product?.category,
                description: product?.description,
                imageUrl: product?.imageUrl,
                name: product?.name,
                quantity: product?.quantity
            }
            const response = await ApiManager.updateProduct(product?.id, body);
        } catch (error) {
            console.log(error);
        } finally {
            handleCloseUpdateModal();
            fetchItems();
        }
    };

    async function handleDeleteItem(id) {
        try {
            const response = await ApiManager.deleteProduct(id);
        } catch (error) {
            console.log(error);
        } finally {
            fetchItems();
        }
    }

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await ApiManager.getProducts();
            const productsArray = Object.entries(response);
            setItems(productsArray);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddItem = () => {
        setCurrentItem(null);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleUpdateItem = (id) => {
        const itemToUpdate = items.find(([itemId]) => itemId === id)[1];
        setCurrentItem({ id, ...itemToUpdate });
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setCurrentItem(null);
    };

    const handleAddProduct = async (product) => {
        try {
            const body = {
                category: product?.category,
                description: product?.description,
                imageUrl: product?.imageUrl,
                name: product?.name,
                quantity: product?.quantity
            }
            const response = await ApiManager.addProduct(body);
        } catch (error) {
            console.log(error);
        } finally {
            handleCloseModal();
            fetchItems();
        }
    };

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
                {items.map(([id, item]) => (
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
                onClick={handleAddItem}
            >
                <AddIcon />
                {!isSmallScreen && <Typography sx={{ ml: 1, color: '#FFFFFF' }}>Add Item</Typography>}
            </Fab>
            <TransitionsModal show={showModal} onClose={handleCloseModal} title={"Add Item"}>
                <ProductForm mode={"Add"} onSubmit={handleAddProduct} />
            </TransitionsModal>
            <TransitionsModal show={showUpdateModal} onClose={handleCloseUpdateModal} title={"Update Item"}>
                <ProductForm mode={"Update"} onSubmit={handleUpdateProduct} initialValues={currentItem} />
            </TransitionsModal>
        </>
    );
};

export default ItemsCard;
