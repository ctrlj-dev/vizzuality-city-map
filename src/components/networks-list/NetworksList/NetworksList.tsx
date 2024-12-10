import NetworksListItem from './NetworksListItem';

const NetworksList = () => {
  return (
    <div className="my-4">
      <NetworksListItem
        id={'123'}
        name={'test'}
        company={['petete']}
        location={{ city: 'Madrid', country: 'Spain' }}
      />
      <NetworksListItem
        id={'123'}
        name={'test'}
        company={['petete']}
        location={{ city: 'Madrid', country: 'Spain' }}
      />
      <NetworksListItem
        id={'123'}
        name={'test'}
        company={['petete']}
        location={{ city: 'Madrid', country: 'Spain' }}
      />
    </div>
  );
};

export default NetworksList;
