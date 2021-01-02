import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import WooCommerce from '../Components/WooCommerce';
import ProductComp from './ProductComp';
import Loader from '../Components/Loader'


export default function ProductShow() {
    const [data, setData] = useState([]);
    const [ loading, setLoading] = useState(true);
    const product = [];

    useEffect(()=>{
        // AsyncStorage.clear();
        WooCommerce.get('products', {
            per_page : 20
        })
          .then(data => {
              setData(data);
              setLoading(false);
          })
          .catch(error => {
          	console.log(error);
          });
    },[])
    if(loading){
        return <Loader/>
    }else{
    return (
        <View style={{alignItems : 'center'}}>
            <View style={{flexWrap : 'wrap', flexDirection : 'row', justifyContent : 'center'}}>
                {data.map((item)=> {
                    if(item){
                        return(item.images.map((image)=>{
                        return(<ProductComp key={item.id} item={item} image={image.src}/>);
                    }))}
                })}
            </View>
        </View>
        
    )}
}