import { getByRole, render, screen, within } from '@testing-library/react';
import { Paging, Navigation } from './contents/Navigation'


test('Paging buttons range with index somewhere in the middle has to be twice the reach', () => {
    let curr = 50, max = 100, r = 5;
    render(<Paging changePage={undefined} curr={curr} max={max} reach={r} />);
    const list = screen.getByRole('paging-buttons');
    const { getAllByRole } = within(list);
    const items = getAllByRole("listitem");
    // range+prev+next buttons
    expect(items.length).toBe(2*r + 2);
});

test('Paging buttons range on first index has to be twice the reach', () => {
    let curr = 1, max = 100, r = 5;
    render(<Paging changePage={undefined} curr={curr} max={max} reach={r} />);
    const list = screen.getByRole('paging-buttons');
    const { getAllByRole } = within(list);
    const items = getAllByRole("listitem");
    // range+prev+next buttons
    expect(items.length).toBe(2*r + 2);
});

test('Paging buttons range on last index has to be twice the reach', () => {
    let curr = 100, max = 100, r = 5;
    render(<Paging changePage={undefined} curr={curr} max={max} reach={r} />);
    const list = screen.getByRole('paging-buttons');
    const { getAllByRole } = within(list);
    const items = getAllByRole("listitem");
    // range+prev+next buttons
    expect(items.length).toBe(2*r + 2);
});

test('Paging buttons range should be smaller than the maximum number of pages', () => {
    let curr = 0, max = 9, r = 10;
    render(<Paging changePage={undefined} curr={curr} max={max} reach={r} />);
    const list = screen.getByRole('paging-buttons');
    const { getAllByRole } = within(list);
    const items = getAllByRole("listitem");
    // max+prev+next buttons
    expect(items.length).toBe(11);
});

test('Page selector highlights button', () => {
    let curr = 5, max = 100, r = 10;
    render(<Paging changePage={undefined} curr={curr} max={max} reach={r} />);
    const list = screen.getByRole('paging-buttons');
    const { getAllByRole } = within(list);
    const items = getAllByRole("listitem");
    const active = items.filter(it => {
        return it.className.match('active') !== null;
    })
    expect(active.length).toBe(1);
    expect(active[0].textContent).toBe(String(curr));
});