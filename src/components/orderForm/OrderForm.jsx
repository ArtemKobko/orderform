import React, { useState } from 'react';
import axios from 'axios';
import styles from './OrderForm.module.scss';

function OrderForm() {
  const [dishConfig, setDishConfig] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMassage, setSuccessMassage] = useState(false);
  const [name, setName] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [type, setType] = useState('');
  const [dishOptions, setDishOptions] = useState('');
  const [diameter, setDiametr] = useState('');

  const makeOrder = (e) => {
    e.preventDefault();
    const payload = {};
    const elements = [...e.target.elements];
    elements.forEach((item) => {
      if (item.name) {
        payload[item.name] = (item.type === 'time') ? item.value : item.valueAsNumber || item.value;
      }
    });
    if (name && preparationTime && type && (type === 'pizza' ? dishOptions && diameter : dishOptions)) {
      axios.post('https://frosty-wood-6558.getsandbox.com:443/dishes', payload)
      /* eslint-disable no-console */
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      setErrorMessage(false);
      setSuccessMassage(<div className={styles.success}>Your order successfully placed </div>);
      setDishOptions('');
    } else {
      setSuccessMassage(false);
      setErrorMessage(<div className={styles.error}>Please fill out all fields </div>);
    }
  };

  const chooseDish = (e) => {
    const getvalue = e.target.value;
    if (getvalue === 'pizza') {
      setType(getvalue);
      return setDishConfig(
        <>
          <div>
            <p>
              How many pieces?
            </p>
            <input type="number" name="no_of_slices" placeholder="4/6/8/10" min="4" max="10" step="2" onChange={(elem) => setDishOptions(elem.target.value)} />

          </div>
          <div>
            <p>
              What size??
            </p>
            <input type="number" name="diameter" placeholder="From 15.0 to 45.5" min="15" max="45.5" step="0.1" onChange={(elem) => setDiametr(elem.target.value)} />

          </div>
        </>,
      );
    }
    if (getvalue === 'soup') {
      setType(getvalue);
      return setDishConfig(
        <div>
          <p>
            How spicy would you like?
          </p>
          <input type="range" name="spiciness_scale" min="1" max="10" step="1" onChange={(elem) => setDishOptions(elem.target.value)} />
        </div>
        ,
      );
    }
    if (getvalue === 'sandwich') {
      setType(getvalue);
      return setDishConfig(
        <div>
          <p>
            How many slices of bread??
          </p>
          <input type="number" name="slices_of_bread" placeholder="1-4" min="1" max="4" step="1" defaultValue={dishOptions} onChange={(elem) => setDishOptions(elem.target.value)} />
        </div>,
      );
    }
    return null;
  };

  return (
    <div>

      <form onSubmit={makeOrder} className={styles.OrderForm}>
        <div className={styles.orderConteiner}>
          <h2 className={styles.header}>Make an order</h2>
          <input type="text" placeholder="Dish name" name="name" autoComplete="off" onChange={(e) => setName(e.target.value)} />
          <input type="time" name="preparation_time" step="1" onChange={(e) => setPreparationTime(e.target.value)} />
          <select name="type" onChange={chooseDish} className={styles.customSelect}>
            <option value="">Сhoose your dish</option>
            <option value="pizza">Pizza</option>
            <option value="soup">Soup</option>
            <option value="sandwich">Sandwich</option>
          </select>
          {dishConfig}
          {errorMessage}
          {successMassage}
          <button type="submit" className={styles.subBtn}>Order Now</button>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;
