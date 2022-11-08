import { CommonModule, CurrencyPipe, DecimalPipe } from "@angular/common";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { PipeFormacaoColunaPipe } from "./pipe-formacao-coluna.pipe";

describe("PipeFormacaoColunaPipe", () => {
  let decimalPipe: DecimalPipe;
  let currencyPipe: CurrencyPipe;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PipeFormacaoColunaPipe],
      imports: [CommonModule],
    }).compileComponents();
  }));

  it("create an instance", () => {
    const pipe = new PipeFormacaoColunaPipe(decimalPipe, currencyPipe);
    expect(pipe).toBeTruthy();
  });
});
