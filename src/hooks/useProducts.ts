import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_QUERY, PRODUCT_BY_HANDLE_QUERY, type ShopifyProduct } from "@/lib/shopify";

export function useProducts(query?: string) {
  return useQuery({
    queryKey: ["products", query ?? "all"],
    queryFn: async () => {
      const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 50, query: query ?? null });
      return (data?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });
}

export function useProductByHandle(handle: string) {
  return useQuery({
    queryKey: ["product", handle],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      const p = data?.data?.product;
      if (!p) return null;
      return { node: p } as ShopifyProduct;
    },
    enabled: !!handle,
  });
}
