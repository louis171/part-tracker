import { useEffect } from "react";
import { baseURL } from '../API/baseUrl';


useEffect(() => {
    // READ all category names
    fetch(`${baseURL}/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.log(err);
      });

    // READ all parts RELEASED dates
    fetch(`${baseURL}/parts/released`)
      .then((response) => response.json())
      .then((data) => {
        // Filters for unique years in returned data
        const uniqueYears = data.filter(
          (value, index, self) =>
            index ===
            self.findIndex(
              (t) =>
                new Date(t.partReleased).getFullYear() ===
                new Date(value.partReleased).getFullYear()
            )
        );
        // Sorted years in descending order
        const sortedYears = []
          .concat(uniqueYears)
          .sort((a, b) =>
            new Date(a.partReleased).getFullYear() <
            new Date(b.partReleased).getFullYear()
              ? 1
              : -1
          );
        setReleased(sortedYears);
      })
      .catch((err) => {
        console.log(err);
      });

    //READ all parts with category names
    fetch(`${baseURL}/parts`)
      .then((response) => response.json())
      .then((data) => {
        setParts(data);
        // Sets loading to false once all data is fetched and sorted
        // ** ADDED 1 SECOND DELAY TO LOADING **
        if (loading) {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
        setRefresh(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);