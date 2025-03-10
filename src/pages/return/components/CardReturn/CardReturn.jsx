import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { formatValue } from '../../../../utils/format';
import { theme } from "../../../../global/styles/theme";

export const CardReturn = ({ returnRequest }) => {
  function getStatusStyles(status) {
    switch (status) {
      case 'Em análise':
        return {
          container: { backgroundColor: theme.colors.yellow6, borderColor: theme.colors.yellow5 },
          text: { color: theme.colors.yellow4 }
        };
      case 'Aguardando troca':
        return {
          container: { backgroundColor: theme.colors.secondarycolor, borderColor: theme.colors.yellow7 },
          text: { color: theme.colors.quaternarycolor }
        };
      case 'Troca realizada':
        return {
          container: { backgroundColor: theme.colors.green1, borderColor: 'transparent' },
          text: { color: theme.colors.green5 }
        };
      case 'Solicitação recusada':
        return {
          container: { backgroundColor: theme.colors.red7, borderColor: theme.colors.red6 },
          text: { color: theme.colors.red5 }
        };
      default:
        return {
          container: { backgroundColor: theme.colors.secondarycolor, borderColor: theme.colors.yellow7 },
          text: { color: theme.colors.quaternarycolor }
        };
    }
  }

  const statusStyle = getStatusStyles(returnRequest.status);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.orderNumberLabel}>Nº Solicitação</Text>
          <Text style={styles.orderNumberValue}>321312</Text>
        </View>
        <View style={[styles.statusContainer, statusStyle.container]}>
          <Text style={[styles.statusText, statusStyle.text]}>
            {returnRequest.isAnalyzing ? 'Troca em análise' : 'Troca aprovada'}
          </Text>
        </View>
      </View>

      <View style={styles.reasonSection}>
        <Text style={styles.sectionLabel}>Motivo</Text>
        <Text style={styles.sectionValue}>Recebi o produto errado</Text>
      </View>

      <View style={styles.shippingSection}>
        <View style={styles.reasonSection}>
          <Text style={styles.sectionLabel}>
            {returnRequest.isKiosk
              ? 'Quiosque para a troca'
              : 'Código de postagem Correios'}
          </Text>
          <Text style={styles.sectionValue}>
            {returnRequest.isKiosk
              ? 'Quiosque Goold - itaquera - São Paulo/SP'
              : '20122012'}
            </Text>
        </View>
        <Text style={styles.sectionValue}>
          {returnRequest.isKiosk ? returnRequest.quiosque_troca : returnRequest.codigo_correios}
        </Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.productsScrollView}
        contentContainerStyle={styles.productsContainer}
      >
        {/* {returnRequest.lista_produtos.map((produto) => (
          <View key={produto.id} style={styles.productItem}>
            <Image
              source={{ uri: produto.products_photos }}
              style={styles.productImage}
              resizeMode="cover"
            />
            <View style={styles.productDetails}>
              <Text style={styles.productName} numberOfLines={1}>
                {produto.title}
              </Text>
              <Text style={styles.productPrice}>
                {formatValue(produto.price)}
              </Text>
            </View>
          </View>
        ))} */}
      </ScrollView>

      <View style={styles.footerContainer}>
        <View>
          <Text style={styles.dateLabel}>Data solicitação</Text>
          <Text style={styles.dateValue}>25/10/25 á 26/10/25</Text>
        </View>
        <View style={[styles.statusPill, statusStyle.container]}>
          <Text style={[styles.statusPillText, statusStyle.text]}>Em análise</Text>
        </View>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  cardContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: '8@s',
    padding: '16@s',
    borderWidth: '1@s',
    borderColor: theme.colors.border,
    marginBottom: '16@s',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '16@s',
    borderBottomWidth: '1@s',
    borderBottomColor: theme.colors.border,
  },
  orderNumberLabel: {
    fontSize: '12@s',
    fontWeight: '500',
    color: theme.colors.grey8,
  },
  orderNumberValue: {
    fontSize: '14@s',
    fontWeight: '500',
  },
  statusContainer: {
    borderRadius: '20@s',
    paddingHorizontal: '8@s',
    paddingVertical: '8@s',
    borderWidth: '1@s',
  },
  statusText: {
    fontSize: '12@s',
    fontWeight: '500',
  },
  reasonSection: {
    marginTop: '12@s',
    marginBottom: '4@s',
  },
  shippingSection: {
    marginVertical: '4@s',
  },
  sectionLabel: {
    fontSize: '12@s',
    fontWeight: '500',
    color: theme.colors.grey8,
    marginBottom: '4@s',
  },
  sectionValue: {
    fontSize: '14@s',
    fontWeight: '500',
  },
  shippingHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusPill: {
    borderRadius: '20@s',
    paddingHorizontal: '8@s',
    paddingVertical: '2@s',
    borderWidth: '1@s',
  },
  statusPillText: {
    fontSize: '10@s',
    fontWeight: '500',
  },
  productsScrollView: {
    marginVertical: '12@s',
  },
  productsContainer: {
    padding: '8@s',
    backgroundColor: theme.colors.white,
    borderRadius: '8@s',
    borderWidth: '1@s',
    borderColor: theme.colors.border,
  },
  productItem: {
    flexDirection: 'row',
    width: '224@s',
    minWidth: '224@s',
    borderRightWidth: '1@s',
    borderRightColor: theme.colors.border,
    paddingRight: '8@s',
    marginRight: '8@s',
  },
  productImage: {
    width: '38@s',
    height: '43@s',
    borderRadius: '4@s',
  },
  productDetails: {
    justifyContent: 'center',
    marginLeft: '8@s',
    flex: 1,
  },
  productName: {
    fontSize: '12@s',
    fontWeight: '500',
  },
  productPrice: {
    fontSize: '12@s',
    fontWeight: '500',
    marginTop: '4@s',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '12@s',
    borderTopWidth: '1@s',
    borderTopColor: theme.colors.border,
  },
  dateLabel: {
    fontSize: '12@s',
    color: theme.colors.grey8,
  },
  dateValue: {
    fontSize: '14@s',
    fontWeight: '500',
  },
});
