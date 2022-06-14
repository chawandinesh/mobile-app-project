const fakeResponse = {
  headers: {
    'content-language': 'de-DE',
    'content-type': 'application/json; charset=utf-8'
  },
  body: {
    result: {
      items: [
        {
          dependencies: [],
          alternates: [],
          specification: [],
          category: 'Accessories',
          categoryId: 37,
          description:
            'Bird Deterrent 30m Solar Panel Bird Exclusion Kit (Galvanized Mesh)',
          productCode: 'BIRD-MESH',
          stockLevels: [
            {
              plannedDate: null,
              quantity: 13,
              inStock: true
            },
            {
              plannedDate: '2021-11-10T00:00:00',
              quantity: 20,
              inStock: false
            }
          ],
          subCategory: 'Bird Protection',
          subCategoryId: 352,
          unitPrice: {
            amount: 156.64,
            currency: 'Gbp'
          },
          price: '£156.64',
          portalUrl:
            'https://legacy-portal-dev-as.azurewebsites.net/nav/-part-BIRD-MESH',
          supplierProductCode: '30M_BIRD_EXCL_KIT',
          weight: 7.565,
          manufacturer: 'Enviroguard'
        },
        {
          dependencies: [],
          alternates: [],
          specification: [],
          category: 'Storage Systems',
          categoryId: 47,
          description:
            'Cable Pack for US2000 / US3000 / Phantom-S Solar Batteries 2m .  For B & C type batteries',
          productCode: 'CAB-PK-PYLON',
          stockLevels: [
            {
              plannedDate: '2021-12-02T00:00:00',
              quantity: 19,
              inStock: false
            },
            {
              plannedDate: '2021-12-21T00:00:00',
              quantity: 60,
              inStock: false
            }
          ],
          subCategory: 'Accessory',
          subCategoryId: 257,
          unitPrice: {
            amount: 14.24,
            currency: 'Gbp'
          },
          price: '£14.24',
          portalUrl:
            'https://legacy-portal-dev-as.azurewebsites.net/nav/-part-CAB-PK-PYLON',
          supplierProductCode: 'BW02PCH23535102M',
          weight: 1.14,
          manufacturer: 'Pylontech'
        },
        {
          dependencies: [],
          alternates: [],
          specification: [],
          category: 'Panels',
          categoryId: 3,
          description:
            'Canadian Solar 345W Super High Power Poly PERC HiKU  (5x Pallets)',
          productCode: 'CS3L-345P-F9H-135',
          stockLevels: [],
          subCategory: 'Large Bulk Packs',
          subCategoryId: 106,
          unitPrice: {
            amount: 11789.83,
            currency: 'Gbp'
          },
          price: '£11,789.83',
          portalUrl:
            'https://legacy-portal-dev-as.azurewebsites.net/nav/-part-CS3L-345P-F9H-135',
          supplierProductCode: null,
          weight: 2848.5,
          manufacturer: 'Canadian Solar'
        },
        {
          dependencies: [],
          alternates: [],
          specification: [],
          category: 'Panels',
          categoryId: 3,
          description:
            'Canadian Solar 345W Super High Power Poly PERC HiKU  (Pallet of 27)',
          productCode: 'CS3L-345P-F9H-27',
          stockLevels: [],
          subCategory: 'Complete Pallet Purchases',
          subCategoryId: 32,
          unitPrice: {
            amount: 2382.53,
            currency: 'Gbp'
          },
          price: '£2,382.53',
          portalUrl:
            'https://legacy-portal-dev-as.azurewebsites.net/nav/-part-CS3L-345P-F9H-27',
          supplierProductCode: null,
          weight: 569.7,
          manufacturer: 'Canadian Solar'
        },
        {
          dependencies: [],
          alternates: [],
          specification: [],
          category: 'Panels',
          categoryId: 3,
          description:
            'Canadian Solar 345W Super High Power Poly PERC HiKU with MC4 (5 x Pallets)',
          productCode: 'CS3L-345P-MC4-F30-150',
          stockLevels: [],
          subCategory: 'Large Bulk Packs',
          subCategoryId: 106,
          unitPrice: {
            amount: 13123.94,
            currency: 'Gbp'
          },
          price: '£13,123.94',
          portalUrl:
            'https://legacy-portal-dev-as.azurewebsites.net/nav/-part-CS3L-345P-MC4-F30-150',
          supplierProductCode: null,
          weight: 3075,
          manufacturer: 'Canadian Solar'
        },
        {
          dependencies: [],
          alternates: [],
          specification: [],
          category: 'Panels',
          categoryId: 3,
          description:
            'Canadian Solar 345W Super High Power Poly PERC HiKU with MC4 (Pallet of 30)',
          productCode: 'CS3L-345P-MC4-F30-30',
          stockLevels: [],
          subCategory: 'Complete Pallet Purchases',
          subCategoryId: 32,
          unitPrice: {
            amount: 2651.76,
            currency: 'Gbp'
          },
          price: '£2,651.76',
          portalUrl:
            'https://legacy-portal-dev-as.azurewebsites.net/nav/-part-CS3L-345P-MC4-F30-30',
          supplierProductCode: null,
          weight: 615,
          manufacturer: 'Canadian Solar'
        },
        {
          dependencies: [],
          alternates: [],
          specification: [],
          category: 'Panels',
          categoryId: 3,
          description:
            'Canadian Solar 365W Super High Power Mono PERC HiKU with MC4-EVO2',
          productCode: 'CS3L-365MS-MC4',
          stockLevels: [
            {
              plannedDate: null,
              quantity: 34,
              inStock: true
            }
          ],
          subCategory: 'Monocrystallines',
          subCategoryId: 29,
          unitPrice: {
            amount: 95.23,
            currency: 'Gbp'
          },
          price: '£95.23',
          portalUrl:
            'https://legacy-portal-dev-as.azurewebsites.net/nav/-part-CS3L-365MS-MC4',
          supplierProductCode: 'CS3L-365MS',
          weight: 21.1,
          manufacturer: 'Canadian Solar'
        },
        {
          dependencies: [],
          alternates: [],
          specification: [],
          category: 'Panels',
          categoryId: 3,
          description:
            'Canadian Solar 365W Super High Power Mono PERC HiKU with MC4-EVO2 (5x Pallets)',
          productCode: 'CS3L-365MS-MC4-135',
          stockLevels: [],
          subCategory: 'Large Bulk Packs',
          subCategoryId: 106,
          unitPrice: {
            amount: 12472.02,
            currency: 'Gbp'
          },
          price: '£12,472.02',
          portalUrl:
            'https://legacy-portal-dev-as.azurewebsites.net/nav/-part-CS3L-365MS-MC4-135',
          supplierProductCode: null,
          weight: 2848.5,
          manufacturer: 'Canadian Solar'
        },
        {
          dependencies: [],
          alternates: [],
          specification: [],
          category: 'Panels',
          categoryId: 3,
          description:
            'Canadian Solar 365W Super High Power Mono PERC HiKu with MC4-EVO2 (Pallet of 27)',
          productCode: 'CS3L-365MS-MC4-27',
          stockLevels: [],
          subCategory: 'Complete Pallet Purchases',
          subCategoryId: 32,
          unitPrice: {
            amount: 2520.04,
            currency: 'Gbp'
          },
          price: '£2,520.04',
          portalUrl:
            'https://legacy-portal-dev-as.azurewebsites.net/nav/-part-CS3L-365MS-MC4-27',
          supplierProductCode: null,
          weight: 569.7,
          manufacturer: 'Canadian Solar'
        },
        {
          dependencies: [],
          alternates: [],
          specification: [],
          category: 'Panels',
          categoryId: 3,
          description:
            'Canadian Solar 365W High Power Mono PERC HiKU with MC4-EVO2 with F30 Frame (5 x Pallet)',
          productCode: 'CS3L-365MS-MC4-F30-150',
          stockLevels: [],
          subCategory: 'Large Bulk Packs',
          subCategoryId: 106,
          unitPrice: {
            amount: 13857.75,
            currency: 'Gbp'
          },
          price: '£13,857.75',
          portalUrl:
            'https://legacy-portal-dev-as.azurewebsites.net/nav/-part-CS3L-365MS-MC4-F30-150',
          supplierProductCode: null,
          weight: 3075,
          manufacturer: 'Canadian Solar'
        }
      ],
      errors: null,
      pageCount: 30,
      pageNumber: 1,
      itemCount: 299
    },
    responseTime: 680
  },
  error: null
};

export { fakeResponse };
