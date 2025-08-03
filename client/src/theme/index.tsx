import { ConfigProvider } from "antd";
export default function TheamProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //childrean ek special type kaa component hai jo sarre component child element ka wrapper hai jo TheamProvider provide kar raha hai
  return (
    <ConfigProvider
      theme={{
        token: {
          //koi bhee global level me change karne ke token kee use hota hai
          colorPrimary: "red",
          colorText: "brown",
          borderRadius: 2,
        },
        components: {
          //ye shirf component level pe change karta hai...shirf ek ek element pe
          Button: {
            controlHeight: 40, //for update the height
            controlOutline: "none", //for removing the shadow
          },
          Input: {
            controlHeight: 40,
            controlOutline: "none",
          },
          Select: {
            controlHeight: 40,
            controlOutline: "none",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
