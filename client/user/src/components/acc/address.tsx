import React from "react";
import { AddressItem, AddressModal } from "../../components";
import { useQuery } from "react-query";
import { getAddressByUidApi } from "../../api/user";

export default function Address({ account }: { account: Object }) {
    const { data: addresses } = useQuery(`${account['phone']}_address`, () => getAddressByUidApi(account['_id'].$oid, 'user'));

    return (
        account && addresses &&
        <div>
            <div className="flex justify-between mb-6 border-b-[1px]">
                <p className="dark:text-white text-2xl font-semibold p-2">
                    Địa chỉ
                </p>
                <AddressModal type="add" addressItem={{}}/>
            </div>
            <ul className="p-2">
                {Array.isArray(addresses) &&
                    addresses.map((item, i) => (
                        <AddressItem key={i} account={account} item={item} />
                    ))}
            </ul>
        </div>
    );
};