'use client'
import ButtonLoader from "@/Components/Loaders/buttonLoader";
import { Badge, Title } from "@/Components/atomics";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    console.log("data is", data);
    
    const fetchData = async () => {
        try {
            const response = await fetch(`https://fun2fun.live/user/receive/gift/get/${params?.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const jsonData = await response.json();
            const extractedGifts = jsonData?.data?.map((item: any) => item.gift);
            setData(extractedGifts);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
          <section className="relative rounded-lg-10 bg-white p-6">
        <nav className="mb-8 flex items-center justify-between">
          <Title size="lg" variant="default">
           Coin History
          </Title>
        </nav>
      </section>
            {isLoading ? (
            <div className="h-screen w-full flex justify-center items-center">
                  <ButtonLoader/>
            </div>
            ) : (
                <div className="p-4">
                    <div className='mb-6 overflow-x-auto'>
                        <table className='w-full table-auto'>
                            <thead className='bg-netral-15 text-body-sm font-semibold uppercase'>
                                <tr>
                                    <th className='whitespace-nowrap px-3 py-4 text-left text-netral-50 first:pl-5 last:pr-5'>
                                        <span className='text-body-sm font-semibold'>
                                            Image
                                        </span>
                                    </th>
                                    <th className='whitespace-nowrap px-3 py-4 text-left text-netral-50 first:pl-5 last:pr-5'>
                                        <span className='text-body-sm font-semibold'>
                                            Name
                                        </span>
                                    </th>
                                    <th className='whitespace-nowrap px-3 py-4 text-left text-netral-50 first:pl-5 last:pr-5'>
                                        <span className='text-body-sm font-semibold'>
                                            User ID
                                        </span>
                                    </th>
                                    <th className='whitespace-nowrap px-3 py-4 text-left text-netral-50 first:pl-5 last:pr-5'>
                                        <span className='text-body-sm font-semibold'>
                                            Email
                                        </span>
                                    </th>
                                    <th className='whitespace-nowrap px-3 py-4 text-left text-netral-50 first:pl-5 last:pr-5'>
                                        <span className='text-body-sm font-semibold'>
                                            Phone
                                        </span>
                                    </th>
                                    <th className='whitespace-nowrap px-3 py-4 text-left text-netral-50 first:pl-5 last:pr-5'>
                                        <span className='text-body-sm font-semibold'>
                                            Coins
                                        </span>
                                    </th>
                                    <th className='whitespace-nowrap px-3 py-4 text-left text-netral-50 first:pl-5 last:pr-5'>
                                        <span className='text-body-sm font-semibold'>
                                            Diamonds
                                        </span>
                                    </th>
                                    <th className='whitespace-nowrap px-3 py-4 text-left text-netral-50 first:pl-5 last:pr-5'>
                                        <span className='text-body-sm font-semibold'>
                                            Beans
                                        </span>
                                    </th>
                                    <th className='whitespace-nowrap px-3 py-4 text-left text-netral-50 first:pl-5 last:pr-5'>
                                        <span className='text-body-sm font-semibold'>
                                            Status
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-netral-20 pt-4 text-sm'>
                                {data?.map((item, index) => (
                                    <tr key={index}>
                                        <td className='whitespace-nowrap px-3 py-5 text-left first:pl-5 last:pr-5'>
                                            <span className='text-body-base font-medium text-netral-80'>
                                                <Image
                                                    height={50}
                                                    width={40}
                                                    src={item?.images?.length > 0 ? item.images[1] : ""}
                                                    alt="gifts"
                                                    className="w-[40px] h-[50px] object-contain"
                                                />
                                            </span>
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-5 text-left first:pl-5 last:pr-5'>
                                            <span className='text-body-base font-medium text-netral-80'>
                                                {item.name ? item.name : "No Data"}
                                            </span>
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-5 text-left first:pl-5 last:pr-5'>
                                            <span className='text-body-base font-medium text-netral-80'>
                                                {item?._id}
                                            </span>
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-5 text-left first:pl-5 last:pr-5'>
                                            <span className='text-body-base font-medium text-netral-80'>
                                                {item.email ? item.email : "No Data"}
                                            </span>
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-5 text-left first:pl-5 last:pr-5'>
                                            <span className='text-body-base font-medium text-netral-80'>
                                                {item.mobile ? item.mobile : "No Data"}
                                            </span>
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-5 text-left first:pl-5 last:pr-5'>
                                            <span className='text-body-base font-medium text-netral-80'>
                                                {item?.coin}
                                            </span>
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-5 text-left first:pl-5 last:pr-5'>
                                            <span className='text-body-base font-medium text-netral-80'>
                                                {item.diamonds ? item.diamonds : "No Data"}
                                            </span>
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-5 text-left first:pl-5 last:pr-5'>
                                            <span className='text-body-base font-medium text-netral-80'>
                                                {item.beans ? item.beans : "No Data"}
                                            </span>
                                        </td>
                                        <td className='whitespace-nowrap- py-5 text-left first:pl-5 last:pr-5'>
                                            <span className='text-body-base font-medium text-netral-80'>
                                                {/* Add status here */}
                                                <Badge variant='success'>Success</Badge>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}

