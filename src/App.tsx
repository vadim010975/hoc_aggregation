import { FC, useState, useEffect } from 'react';

type List = {
  list: {
    date: string,
    amount: number,
  }[],
};

type YearTableProps = {
  list: {
    year: number,
    amount: number,
  }[],
};

type MonthTableProps = {
  list: {
    month: string,
    amount: number,
  }[],
};

type SortTableProps = {
  list: {
    date: string,
    amount: number,
  }[],
};

const YearTable: FC<YearTableProps> = (props) => {
  console.log('YearTable', props);

  return (
    <div>
      <h2>Year Table</h2>
      <table>
        <tr>
          <th>Year</th>
          <th>Amount</th>
        </tr>
        {props.list.map(item => (
          <tr>
            <td>{item.year}</td>
            <td>{item.amount}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

const SortTable: FC<SortTableProps> = (props) => {
  console.log('SortTable', props);

  return (
    <div>
      <h2>Sort Table</h2>
      <table>
        <tr>
          <th>Date</th>
          <th>Amount</th>
        </tr>
        {props.list.map(item => (
          <tr>
            <td>{item.date}</td>
            <td>{item.amount}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

const MonthTable: FC<MonthTableProps> = (props) => {
  console.log('MonthTable', props);

  return (
    <div>
      <h2>Month Table</h2>
      <table>
        <tr>
          <th>Month</th>
          <th>Amount</th>
        </tr>
        {props.list.map(item => (
          <tr>
            <td>{item.month}</td>
            <td>{item.amount}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

const withSorting = (Component: any) => {
  // const { func } = options;

  
  const WithSorting: FC<List> = (props) => {

    console.log('WithSorting', props);

    const { list } = props;

    console.log('WithSorting.list', list);
    
    const newArr = list.filter(item => new Date(item.date).getFullYear() === 2018).sort((a, b) => new Date(a.date).getMonth() - new Date(b.date).getMonth());

    

    
    return (
      <>
        <Component list={newArr}/>
      </>
    );
  }
  const componentName = Component.displayName || Component.name;
  WithSorting.displayName = `withSorting(${componentName})`;
  
  return WithSorting;
}

// TODO:
// 1. Загрузите данные с помощью fetch: https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json
// 2. Не забудьте вынести URL в переменные окружения (не хардкодьте их здесь)
// 3. Положите их в state

const MonthTableWithSorting = withSorting(MonthTable);

const App = () => {

  const [list, setList] = useState<{ date: string, amount: number, }[]>([]);

  const fetchData = async () => {
    const r = await fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json');
    const data = await r.json();
    console.log("data", data);
    setList(data);
  }
    
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="app">
      <MonthTableWithSorting list={list} />
      {/* <YearTable list={list} />
      <SortTable list={list} /> */}
    </div>
  );

}

export default App;