// in the useDebounce file
import { useEffect } from 'react';
/**
 * @description for use in functions with side-effects but no return value
 * @export useDebouncedFunction
 */

interface IProps {
   handler: any;
   watchedValue: any;
   delay?: number;
}

export default function useDebouncedFunction<IProps>(handler:any, watchedValue:any, delay:number = 500): any {
  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      handler();
    }, delay);
    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [watchedValue, delay]);
}


// in the search file
//   const [searchQuery, setSearchQuery] = React.useState('');
//   const fetchX = async () => {
//     await getX()
//       .then((updatedStock: IStockResponse) => {
//         setX(updated.data?? []);
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   };
//   useDebouncedFunction(fetchStockVehicles, searchQuery, 1000);
//   const handleSearch = (value: string) => {
//     setSearchQuery(value ?? '');
//   };

// https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci