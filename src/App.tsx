import React, { FC, useState, useEffect } from 'react';

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
    month: number,
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
        <thead>
          <tr>
            <th>Year</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((item, key) => (
            <tr key={key}>
              <td>{item.year}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
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
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((item, key) => (
            <tr key={key}>
              <td>{item.date}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
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
        <thead>
          <tr>
            <th>Month</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((item, key) => (
            <tr key={key}>
              <td>{item.month}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type GroupByMonth = (list: { date: string, amount: number }[]) => { month: number, amount: number }[];

type GroupByYear = (list: { date: string, amount: number }[]) => { year: number, amount: number }[];

type SortВescending = (list: { date: string, amount: number }[]) => { date: string, amount: number }[];

const groupByMonthForTheCurrentYear: GroupByMonth = (list) => {
  return list.
    filter(item => new Date(item.date).getFullYear() === 2018).
    map(item => ({ month: new Date(item.date).getMonth() + 1, amount: item.amount })).
    sort((a, b) => a.month - b.month);
}

const groupByYear: GroupByYear = (list) => {
  return list.
    map(item => ({ year: new Date(item.date).getFullYear(), amount: item.amount })).
    sort((a, b) => a.year - b.year);
}

const sortВescending: SortВescending = (list) => {
  return list.sort((a, b) => b.amount - a.amount);
}

function withSorting<T extends MonthTableProps | YearTableProps | SortTableProps>(Component: React.ComponentType<T>, func: GroupByMonth | GroupByYear | SortВescending) {

  const WithSorting: FC<List> = ({ list }) => {

    return (
      <>
        <Component  {...{ list: func(list) } as T} />
      </>
    );
  }

  const componentName = Component.displayName || Component.name || "Component";
  WithSorting.displayName = `withSorting(${componentName})`;

  return WithSorting;
}

const MonthTableWithSorting = withSorting(MonthTable, groupByMonthForTheCurrentYear);

const YearTableWithSorting = withSorting(YearTable, groupByYear);

const SortTableWithSorting = withSorting(SortTable, sortВescending);

const App = () => {

  const [list, setList] = useState<{ date: string, amount: number, }[]>([]);

  const fetchData = async () => {
    const r = await fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json');
    const data = await r.json();
    setList(data.list);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="app">
      <MonthTableWithSorting list={list} />
      <YearTableWithSorting list={list} />
      <SortTableWithSorting list={list} />
    </div>
  );

}

export default App;