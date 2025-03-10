import { ScaledSheet } from "react-native-size-matters";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "../../../../global/styles/theme";

import SVGLocationIcon from "../../../../images/svg/traking/SVGLocationIcon";
import SVGReturnIcon from "../../../../images/svg/traking/SVGReturnIcon";
import SVGShipmentIcon from "../../../../images/svg/traking/SVGShipmentIcon";

export const TrackingCard = ({ shipment }) => {
  const getStatusStyle = () => {
    if (shipment.delivery_status === 'Entregue') {
      return {
        container: styles.deliveredStatusContainer,
        text: styles.deliveredStatusText
      };
    } else if (shipment.delivery_status === 'Issue') {
      return {
        container: styles.issueStatusContainer,
        text: styles.issueStatusText
      };
    }
    return {
      container: styles.defaultStatusContainer,
      text: styles.defaultStatusText
    };
  };

  const statusStyle = getStatusStyle();
  
  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.orderNumberLabel}>Nº Pedido</Text>
          <Text style={styles.orderNumberValue}>tracking_number</Text>
        </View>
        
        <TouchableOpacity style={styles.returnButton}>
          <SVGReturnIcon />
          <Text style={styles.returnButtonText}>Trocar & Devolver</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.locationContainer}>
        <View style={styles.mapContainer}>
          <Image 
            source={require("../../../../images/png/map.png")} 
            style={styles.mapImage} 
          />
          <View style={styles.locationIconContainer}>
            <SVGLocationIcon />
          </View>
        </View>
        
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>Rua coronel irineu de castro 43</Text>
          <Text style={styles.cityText}>
            {shipment.isKiosk ? shipment.kiosk_name : shipment.city}
          </Text>
        </View>
      </View>
      
      <View style={styles.statusSection}>
        <View style={[styles.statusContainer, statusStyle.container]}>
          <View style={styles.shipmentIconContainer}>
            <SVGShipmentIcon />
          </View>
          <Text style={[styles.statusText, statusStyle.text]}>
            Em rota de entrega
          </Text>
        </View>
      </View>
      
      <View style={styles.footerContainer}>
        <View style={styles.courierContainer}>
          <View style={styles.courierLogoContainer}>
            <Image 
              source={require("../../../../images/png/correios.png")} 
              style={styles.courierLogo} 
            />
          </View>
          
          <View>
            <Text style={styles.courierLabel}>Transportadora</Text>
            <Text style={styles.courierName}>Correios</Text>
          </View>
        </View>
        
        <View>
          <Text style={styles.deliveryDateLabel}>Previsão de entrega</Text>
          <Text style={styles.deliveryDateValue}>25/10/25 á 26/10/25</Text>
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: theme.colors.grey0,
    borderRadius: "10@s",
    padding: "15@s",
    marginBottom: "20@s",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey0,
    paddingBottom: "15@s",
  },
  orderNumberLabel: {
    fontSize: "10@s",
    fontFamily: theme.fonts.fontPoppinsMedium,
    color: theme.colors.grey8,
  },
  orderNumberValue: {
    fontSize: "12@s",
    fontFamily: theme.fonts.fontPoppinsMedium,
  },
  returnButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primaryColor,
    borderRadius: "20@s",
    paddingHorizontal: "8@s",
    paddingVertical: "4@s",
  },
  returnButtonText: {
    fontSize: "10@s",
    fontFamily: theme.fonts.fontPoppinsMedium,
    color: theme.colors.white,
    marginLeft: "4@s",
  },
  locationContainer: {
    flexDirection: "row",
    gap: "12@s",
    paddingVertical: "15@s",
  },
  mapContainer: {
    width: "48@s",
    height: "48@s",
    borderRadius: "10@s",
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  locationIconContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "999@s",
    padding: "4@s",
    backgroundColor: theme.colors.primaryColor
  },
  addressContainer: {
    justifyContent: "center",
  },
  addressText: {
    fontSize: "10@s",
    fontFamily: theme.fonts.fontPoppinsRegular,
  },
  cityText: {
    fontSize: "10@s",
    fontFamily: theme.fonts.fontPoppinsRegular,
    color: theme.colors.grey9,
  },
  statusSection: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey0,
    paddingBottom: "15@s",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "20@s",
    paddingHorizontal: "12@s",
    paddingVertical: "4@s",
    alignSelf: "flex-start",
    gap: "8@s",
  },
  defaultStatusContainer: {
    backgroundColor: theme.colors.secondaryColor,
  },
  deliveredStatusContainer: {
    backgroundColor: theme.colors.green1,
  },
  issueStatusContainer: {
    backgroundColor: theme.colors.red4,
  },
  shipmentIconContainer: {
    borderRadius: "20@s",
    color: theme.colors.white,
    backgroundColor: theme.colors.primaryColor,
    padding: "2@s",
  },
  statusText: {
    fontSize: "10@s",
    fontFamily: theme.fonts.fontPoppinsMedium,
  },
  defaultStatusText: {
    color: theme.colors.primaryColor,
  },
  deliveredStatusText: {
    color: theme.colors.green5,
  },
  issueStatusText: {
    color: theme.colors.red5,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "15@s",
  },
  courierContainer: {
    flexDirection: "row",
    gap: "12@s",
  },
  courierLogoContainer: {
    width: "36@s",
    height: "36@s",
    borderRadius: "18@s",
    borderWidth: 1,
    borderColor: theme.colors.grey0,
    overflow: "hidden",
  },
  courierLogo: {
    width: "100%",
    height: "100%",
  },
  courierLabel: {
    fontSize: "10@s",
    fontFamily: theme.fonts.fontPoppinsRegular,
    color: theme.colors.grey8,
  },
  courierName: {
    fontSize: "12@s",
    fontFamily: theme.fonts.fontPoppinsMedium,
  },
  deliveryDateLabel: {
    fontSize: "10@s",
    fontFamily: theme.fonts.fontPoppinsRegular,
    color: theme.colors.grey8,
  },
  deliveryDateValue: {
    fontSize: "12@s",
    fontFamily: theme.fonts.fontPoppinsMedium,
  }
});
